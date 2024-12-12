import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight, Scale } from "lucide-react";

export function RealtimeMetrics() {
  const metrics = [
    {
      title: "Schweizer Agrar- und Lebensmittelimporte",
      value: "12.8 Mrd. CHF",
      icon: <ArrowDownRight className="h-4 w-4 text-primary-light" />,
      description: "Importwert 2022 (Quelle: BLW)",
    },
    {
      title: "Schweizer Agrar- und Lebensmittelexporte",
      value: "9.8 Mrd. CHF",
      icon: <ArrowUpRight className="h-4 w-4 text-primary-light" />,
      description: "Exportwert 2022 (Quelle: BLW)",
    },
    {
      title: "Selbstversorgungsgrad",
      value: "54%",
      icon: <Scale className="h-4 w-4 text-primary-light" />,
      description: "Netto 2022 (Quelle: Agristat)",
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