import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export function SupplyChainMap() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Supply Chain Map
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="aspect-[16/9] bg-slate-100 relative">
          <div className="absolute inset-0 flex items-center justify-center text-slate-500">
            Map visualization will be implemented in the next iteration
          </div>
        </div>
      </CardContent>
    </Card>
  );
}