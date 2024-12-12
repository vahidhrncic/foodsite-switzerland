import { Marker, Popup } from 'react-leaflet';
import { Region } from './types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MarkerPopup } from './components/MarkerPopup';

interface MapMarkerProps {
  region: Region;
}

export const MapMarker = ({ region }: MapMarkerProps) => {
  const position: [number, number] = [region.coordinates.y, region.coordinates.x];

  const customIcon = L.divIcon({
    className: '',
    html: `<div style="background-color: ${
      region.status === 'good' ? '#86efac' : 
      region.status === 'warning' ? '#fde047' : 
      '#fca5a5'
    }; width: 30px; height: 30px; border-radius: 50%; border: 2px solid white;"></div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  });

  return (
    <Marker 
      position={position}
      icon={customIcon}
    >
      <Popup>
        <MarkerPopup region={region} />
      </Popup>
    </Marker>
  );
};