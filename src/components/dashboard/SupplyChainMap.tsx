import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { MapMarker } from './map/MapMarker';
import { regions } from './map/regions-data';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression } from 'leaflet';
import { useEffect } from "react";

function SetViewOnMount({ center, zoom }: { center: LatLngExpression, zoom: number }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, map, zoom]);
  
  return null;
}

export function SupplyChainMap() {
  const center: LatLngExpression = [47, 8];
  const zoom = 4;

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Globale Ressourcenkarte
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden">
          <MapContainer
            style={{ height: '100%', width: '100%' }}
          >
            <SetViewOnMount center={center} zoom={zoom} />
            <TileLayer
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