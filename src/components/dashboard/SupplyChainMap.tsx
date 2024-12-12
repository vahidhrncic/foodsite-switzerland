import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Wheat } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface Resource {
  name: string;
  production: string;
  consumption: string;
  trend: 'up' | 'down' | 'stable';
  availability: 'high' | 'medium' | 'low';
}

interface Region {
  id: string;
  name: string;
  resources: Resource[];
  coordinates: { x: number; y: number };
  weatherConditions?: string;
}

const regions: Region[] = [
  {
    id: "eu",
    name: "European Union",
    resources: [
      {
        name: "Wheat",
        production: "135M tons",
        consumption: "120M tons",
        trend: "stable",
        availability: "high"
      },
      {
        name: "Dairy",
        production: "155M tons",
        consumption: "145M tons",
        trend: "up",
        availability: "high"
      }
    ],
    coordinates: { x: 48, y: 25 },
    weatherConditions: "Normal seasonal conditions"
  },
  {
    id: "na",
    name: "North America",
    resources: [
      {
        name: "Corn",
        production: "360M tons",
        consumption: "310M tons",
        trend: "up",
        availability: "high"
      },
      {
        name: "Soybeans",
        production: "120M tons",
        consumption: "60M tons",
        trend: "stable",
        availability: "medium"
      }
    ],
    coordinates: { x: 20, y: 30 },
    weatherConditions: "Drought in midwest regions"
  },
  {
    id: "sa",
    name: "South America",
    resources: [
      {
        name: "Coffee",
        production: "85M tons",
        consumption: "25M tons",
        trend: "down",
        availability: "medium"
      },
      {
        name: "Sugar",
        production: "45M tons",
        consumption: "30M tons",
        trend: "stable",
        availability: "high"
      }
    ],
    coordinates: { x: 30, y: 60 },
    weatherConditions: "Heavy rainfall affecting harvests"
  }
];

const getAvailabilityColor = (availability: string) => {
  switch (availability) {
    case 'high':
      return 'bg-green-100 text-green-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'low':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export function SupplyChainMap() {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Global Resource Map
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="aspect-[16/9] bg-slate-100 rounded-lg p-4">
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
                          <li key={resource.name} className="mt-1">
                            {resource.name}
                            <Badge className={`ml-2 ${getAvailabilityColor(resource.availability)}`}>
                              {resource.availability}
                            </Badge>
                          </li>
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
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-lg">{selectedRegion.name}</h3>
                {selectedRegion.weatherConditions && (
                  <Badge variant="outline" className="ml-2">
                    {selectedRegion.weatherConditions}
                  </Badge>
                )}
              </div>
              <div className="mt-4 space-y-4">
                {selectedRegion.resources.map((resource) => (
                  <div key={resource.name} className="border-b pb-3 last:border-0">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{resource.name}</h4>
                      <Badge className={getAvailabilityColor(resource.availability)}>
                        {resource.availability}
                      </Badge>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Production:</span>
                        <span className="ml-2">{resource.production}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Consumption:</span>
                        <span className="ml-2">{resource.consumption}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}