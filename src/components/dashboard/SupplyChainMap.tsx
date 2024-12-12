import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { MapContainer, TileLayer } from 'react-leaflet';
import { MapMarker } from './map/MapMarker';
import { regions } from './map/regions-data';
import 'leaflet/dist/leaflet.css';

export function SupplyChainMap() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Global Resource Map
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[400px] rounded-lg overflow-hidden">
          <MapContainer
            center={[20, 0] as [number, number]}
            zoom={2}
            scrollWheelZoom={false}
            style={{ height: '100%', width: '100%' }}
            className="z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {regions.map((region) => (
              <MapMarker key={region.id} region={region} />
            ))}
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  );
}