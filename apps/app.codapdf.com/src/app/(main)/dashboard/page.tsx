import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { serverApi } from "@/server/trpc/trpcServer";
import { use } from "react";
export default function APIUsage() {
  const apiUsageData = use(serverApi.apiMetrics.metrics());
  return (
    <div className="grid gap-4 p-4 text-foreground">
      <h1 className="font-bold text-2xl">API Usage Statistics</h1>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {apiUsageData.map((item) => (
          <Card key={item.title}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription className="text-gray-400">{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-bold text-3xl">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
