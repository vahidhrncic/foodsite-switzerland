import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Wheat } from "lucide-react";
import { useState } from "react";

interface Region {
  id: string;
  name: string;
  resources: string[];
  coordinates: { x: number; y: number };
}

const regions: Region[] = [
  {
    id: "eu",
    name: "European Union",
    resources: ["Wheat", "Dairy", "Vegetables"],
    coordinates: { x: 48, y: 25 }
  },
  {
    id: "na",
    name: "North America",
    resources: ["Corn", "Soybeans", "Beef"],
    coordinates: { x: 20, y: 30 }
  },
  {
    id: "sa",
    name: "South America",
    resources: ["Coffee", "Sugar", "Fruits"],
    coordinates: { x: 30, y: 60 }
  }
];

export function SupplyChainMap() {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Supply Chain Map
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="aspect-[16/9] bg-slate-100 rounded-lg p-4">
            {/* Interactive Map Region */}
            <div className="absolute inset-0 flex items-center justify-center">
              {regions.map((region) => (
                <div
                  key={region.id}
                  className="absolute cursor-pointer group"
                  style={{
                    left: `${region.coordinates.x}%`,
                    top: `${region.coordinates.y}%`
                  }}
                  onClick={() => setSelectedRegion(region)}
                >
                  <div className="p-2 bg-primary rounded-full hover:scale-110 transition-transform">
                    <Wheat className="h-4 w-4 text-white" />
                  </div>
                  <div className="hidden group-hover:block absolute z-10 bg-white p-3 rounded-lg shadow-lg -translate-x-1/2 mt-2 w-48">
                    <h4 className="font-semibold">{region.name}</h4>
                    <div className="mt-2">
                      <p className="text-sm font-medium">Key Resources:</p>
                      <ul className="text-sm text-muted-foreground">
                        {region.resources.map((resource) => (
                          <li key={resource}>{resource}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {selectedRegion && (
            <div className="mt-4 p-4 border rounded-lg">
              <h3 className="font-semibold text-lg">{selectedRegion.name}</h3>
              <div className="mt-2">
                <p className="font-medium">Available Resources:</p>
                <ul className="mt-1 space-y-1">
                  {selectedRegion.resources.map((resource) => (
                    <li key={resource} className="text-sm text-muted-foreground">
                      • {resource}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}