import { Marker, Popup } from 'react-leaflet';
import { Badge } from "@/components/ui/badge";
import { Resource, Region } from './types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface MapMarkerProps {
  region: Region;
}

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

export const MapMarker = ({ region }: MapMarkerProps) => {
  const position: [number, number] = [region.coordinates.y, region.coordinates.x];

  return (
    <Marker 
      position={position}
      icon={customIcon}
    >
      <Popup>
        <div className="p-2 max-w-xs">
          <h3 className="font-semibold text-lg">{region.name}</h3>
          {region.weatherConditions && (
            <Badge variant="outline" className="mt-1">
              {region.weatherConditions}
            </Badge>
          )}
          <div className="mt-2">
            {region.resources.map((resource) => (
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
      </Popup>
    </Marker>
  );
};