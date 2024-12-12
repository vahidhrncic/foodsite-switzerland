import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Truck, Globe } from "lucide-react";

export function RealtimeMetrics() {
  const metrics = [
    {
      title: "Active Shipments",
      value: "1,234",
      icon: <Truck className="h-4 w-4 text-primary-light" />,
      description: "23% increase from last month",
    },
    {
      title: "Inventory Items",
      value: "12,345",
      icon: <Package className="h-4 w-4 text-primary-light" />,
      description: "5% decrease from last week",
    },
    {
      title: "Global Suppliers",
      value: "89",
      icon: <Globe className="h-4 w-4 text-primary-light" />,
      description: "Active in 15 countries",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {metrics.map((metric) => (
        <Card key={metric.title} className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            {metric.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {metric.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}