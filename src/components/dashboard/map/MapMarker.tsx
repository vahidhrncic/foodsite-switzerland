import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { MarkerPopup } from './components/MarkerPopup';
import { Region } from './types';

interface MapMarkerProps {
  region: Region;
  position: [number, number];
}

export const MapMarker = ({ region, position }: MapMarkerProps) => {
  const customIcon = new L.DivIcon({
    className: 'custom-div-icon',
    html: `<div class="marker-pin" style="background-color: ${
      region.status === 'good' ? '#86efac' : 
      region.status === 'warning' ? '#fde047' : 
      '#fca5a5'
    }; width: 30px; height: 30px; border-radius: 50%; border: 2px solid white;"></div>`,
    iconSize: L.point(30, 30),
    iconAnchor: L.point(15, 15)
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