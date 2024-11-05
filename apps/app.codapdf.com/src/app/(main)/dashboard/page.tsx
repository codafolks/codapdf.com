import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function APIUsage() {
  const apiUsageData = [
    {
      title: "Total Requests",
      value: "1,234,567",
      description: "API calls made this month",
    },
    {
      title: "Average Response Time",
      value: "120ms",
      description: "Average time to process requests",
    },
    {
      title: "Error Rate",
      value: "0.5%",
      description: "Percentage of failed requests",
    },
    {
      title: "Unique Users",
      value: "5,678",
      description: "Distinct API users this month",
    },
    {
      title: "Bandwidth Used",
      value: "1.2 TB",
      description: "Total data transferred",
    },
    {
      title: "Peak Requests/Second",
      value: "1,000",
      description: "Highest request rate observed",
    },
  ];
  return (
    <div className="p-4 grid gap-4">
      <h1 className="text-2xl font-bold  text-gray-100">
        API Usage Statistics
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {apiUsageData.map((item) => (
          <Card key={item.title}>
            <CardHeader>
              <CardTitle className="text-gray-100">{item.title}</CardTitle>
              <CardDescription className="text-gray-400">
                {item.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
