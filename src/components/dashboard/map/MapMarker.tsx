import { Marker } from 'react-leaflet';
import L from 'leaflet';
import { MarkerPopup } from './components/MarkerPopup';
import { Region } from './types';

interface MapMarkerProps {
  region: Region;
  position: [number, number];
}

export const MapMarker = ({ region, position }: MapMarkerProps) => {
  const customIcon = L.divIcon({
    className: 'custom-div-icon',
    html: `<div class="marker-pin" style="background-color: ${
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
      <MarkerPopup region={region} />
    </Marker>
  );
};