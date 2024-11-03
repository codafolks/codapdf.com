import { db } from "@/server/database";
import { apiMetrics } from "@/server/database/schemas/apiMetrics";
import { protectedProcedure } from "@/server/trpc/procedures/protectedProcedure";
import { and, eq, gte, lt, sql } from "drizzle-orm";

function getMonthDateRange() {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);
  const endOfMonth = new Date(startOfMonth);
  endOfMonth.setMonth(endOfMonth.getMonth() + 1);
  return { startOfMonth, endOfMonth };
}

function formatBytes(bytes: number): string {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 Bytes";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const formattedBytes = parseFloat((bytes / Math.pow(1024, i)).toFixed(2));
  return `${formattedBytes} ${sizes[i]}`;
}

async function getTotalRequests(start: Date, end: Date, userId: number): Promise<number> {
  if (!start || !end) {
    console.error("Start or end date is invalid:", { start, end });
    return 0;
  }
  const result = await db
    .select({
      count: sql`COUNT(*)`,
    })
    .from(apiMetrics)
    .where(and(gte(apiMetrics.timestamp, start), lt(apiMetrics.timestamp, end), eq(apiMetrics.userId, userId)))
    .limit(1);
  return Number(result[0]?.count ?? 0);
}

async function getAverageResponseTime(start: Date, end: Date, userId: number) {
  const [result] = await db
    .select({
      avg: sql`AVG(${apiMetrics.responseTimeMs})`,
    })
    .from(apiMetrics)
    .where(and(gte(apiMetrics.timestamp, start), lt(apiMetrics.timestamp, end), eq(apiMetrics.userId, userId)))
    .limit(1);

  return Number(result?.avg ?? 0);
}

// async function getErrorRate(totalRequests: number, start: Date, end: Date, userId: number): Promise<number> {
//   if (totalRequests === 0) return 0;

//   const [result] = await db
//     .select({
//       count: sql`COUNT(*)::int`,
//     })
//     .from(apiMetrics)
//     .where(
//       and(
//         eq(apiMetrics.error, true),
//         gte(apiMetrics.timestamp, start),
//         lt(apiMetrics.timestamp, end),
//         eq(apiMetrics.userId, userId),
//       ),
//     )
//     .limit(1);

//   const errorCount = result?.count ?? 0;
//   return (Number(errorCount) / totalRequests) * 100;
// }

async function getTotalBandwidth(start: Date, end: Date, userId: number): Promise<number> {
  const result = await db
    .select({
      sum: sql`SUM(${apiMetrics.dataTransferredBytes})`,
    })
    .from(apiMetrics)
    .where(and(gte(apiMetrics.timestamp, start), lt(apiMetrics.timestamp, end), eq(apiMetrics.userId, userId)))
    .limit(1);

  return Number(result[0]?.sum ?? 0);
}

async function getPeakRequestsPerSecond(start: Date, end: Date, userId: number): Promise<number> {
  // Inner query: count requests per second
  const subquery = db
    .select({
      requestsPerSecond: sql`COUNT(*)`.as("requests_per_second"),
    })
    .from(apiMetrics)
    .where(and(gte(apiMetrics.timestamp, start), lt(apiMetrics.timestamp, end), eq(apiMetrics.userId, userId)))
    .groupBy(sql`DATE_TRUNC('second', ${apiMetrics.timestamp})`)
    .as("subquery");

  // Outer query: get max requests per second
  const result = await db
    .select({
      maxCount: sql`MAX(${subquery.requestsPerSecond})`.as("max_count"),
    })
    .from(subquery);

  return Number(result[0]?.maxCount ?? 0);
}

async function getMetricsData(userId: number) {
  const { startOfMonth, endOfMonth } = getMonthDateRange();
  const totalRequests = await getTotalRequests(startOfMonth, endOfMonth, userId);
  const averageResponseTime = await getAverageResponseTime(startOfMonth, endOfMonth, userId);
  // const errorRate = await getErrorRate(totalRequests, startOfMonth, endOfMonth, userId);
  const totalBandwidth = await getTotalBandwidth(startOfMonth, endOfMonth, userId);
  const peakRequestsPerSecond = await getPeakRequestsPerSecond(startOfMonth, endOfMonth, userId);

  const metricsData = [
    {
      title: "Total Requests",
      value: totalRequests.toLocaleString(),
      description: "API calls made this month",
    },
    {
      title: "Average Response Time",
      value: `${averageResponseTime.toFixed(2)}ms`,
      description: "Average time to process requests",
    },
    // {
    //   title: "Error Rate",
    //   value: `${errorRate.toFixed(2)}%`,
    //   description: "Percentage of failed requests",
    // },
    {
      title: "Bandwidth Used",
      value: formatBytes(totalBandwidth ?? 0),
      description: "Total data transferred",
    },
    {
      title: "Peak Requests/Second",
      value: peakRequestsPerSecond.toLocaleString(),
      description: "Highest request rate observed",
    },
  ];

  return metricsData;
}

export const apiMetricRouter = {
  metrics: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.user;
    const metricsData = await getMetricsData(user.id);
    return metricsData;
  }),
};
