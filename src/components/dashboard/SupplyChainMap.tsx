import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Wheat } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

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

const mapContainerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 20,
  lng: 0
};

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

  const markers = regions.map(region => ({
    position: {
      lat: region.coordinates.y,
      lng: region.coordinates.x
    },
    region
  }));

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Global Resource Map
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full rounded-lg overflow-hidden">
          <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={2}
              options={{
                styles: [
                  {
                    featureType: "all",
                    elementType: "labels",
                    stylers: [{ visibility: "off" }]
                  }
                ]
              }}
            >
              {markers.map((marker, index) => (
                <Marker
                  key={index}
                  position={marker.position}
                  onClick={() => setSelectedRegion(marker.region)}
                  icon={{
                    path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
                    fillColor: "#1E40AF",
                    fillOpacity: 1,
                    strokeWeight: 0,
                    scale: 1.5
                  }}
                />
              ))}

              {selectedRegion && (
                <InfoWindow
                  position={{
                    lat: selectedRegion.coordinates.y,
                    lng: selectedRegion.coordinates.x
                  }}
                  onCloseClick={() => setSelectedRegion(null)}
                >
                  <div className="p-2 max-w-xs">
                    <h3 className="font-semibold text-lg">{selectedRegion.name}</h3>
                    {selectedRegion.weatherConditions && (
                      <Badge variant="outline" className="mt-1">
                        {selectedRegion.weatherConditions}
                      </Badge>
                    )}
                    <div className="mt-2">
                      {selectedRegion.resources.map((resource) => (
                        <div key={resource.name} className="mt-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{resource.name}</span>
                            <Badge className={getAvailabilityColor(resource.availability)}>
                              {resource.availability}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-600">
                            <div>Production: {resource.production}</div>
                            <div>Consumption: {resource.consumption}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </LoadScript>
        </div>
      </CardContent>
    </Card>
  );
}
