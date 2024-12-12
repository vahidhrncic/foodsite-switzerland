import { Marker } from 'react-leaflet';
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
    html: `<div class="marker-pin"></div>`,
    iconSize: L.point(30, 30),
    iconAnchor: L.point(15, 30),
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