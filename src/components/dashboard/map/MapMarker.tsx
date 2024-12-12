import { Marker, Popup } from 'react-leaflet';
import { Badge } from "@/components/ui/badge";
import { Resource, Region, TradeRisk } from './types';
import L from 'leaflet';
import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon, AlertTriangle } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

const getStatusColor = (status: Region['status']) => {
  switch (status) {
    case 'good':
      return 'bg-green-100 text-green-800';
    case 'warning':
      return 'bg-yellow-100 text-yellow-800';
    case 'critical':
      return 'bg-red-100 text-red-800';
  }
};

const getTrendIcon = (trend: Resource['trend']) => {
  switch (trend) {
    case 'up':
      return <ArrowUpIcon className="h-4 w-4 text-green-600" />;
    case 'down':
      return <ArrowDownIcon className="h-4 w-4 text-red-600" />;
    case 'stable':
      return <ArrowRightIcon className="h-4 w-4 text-blue-600" />;
  }
};

const getAvailabilityColor = (availability: Resource['availability']) => {
  switch (availability) {
    case 'high':
      return 'bg-green-100 text-green-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'low':
      return 'bg-red-100 text-red-800';
  }
};

const getRiskSeverityColor = (severity: TradeRisk['severity']) => {
  switch (severity) {
    case 'high':
      return 'text-red-600';
    case 'medium':
      return 'text-yellow-600';
    case 'low':
      return 'text-green-600';
  }
};

interface MapMarkerProps {
  region: Region;
}

export const MapMarker = ({ region }: MapMarkerProps) => {
  const position: [number, number] = [region.coordinates.y, region.coordinates.x];

  const markerIcon = L.divIcon({
    className: '',
    html: `<div style="background-color: ${
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
      icon={markerIcon}
    >
      <Popup>
        <div className="p-2 max-w-xs">
          <h3 className="font-semibold text-lg mb-2">{region.name}</h3>
          <Badge variant="secondary" className={getStatusColor(region.status)}>
            {region.status === 'good' ? 'Gute Versorgung' : 
             region.status === 'warning' ? 'Eingeschränkte Versorgung' : 
             'Kritische Versorgung'}
          </Badge>
          
          {region.weatherConditions && (
            <div className="mt-2 text-sm text-gray-600">
              <span className="font-medium">Wetterbedingungen:</span> {region.weatherConditions}
            </div>
          )}

          <div className="mt-3 space-y-3">
            {region.resources.map((resource) => (
              <div key={resource.name} className="border-t pt-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{resource.name}</span>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(resource.trend)}
                    <Badge className={getAvailabilityColor(resource.availability)}>
                      {resource.availability === 'high' ? 'Hohe Verfügbarkeit' :
                       resource.availability === 'medium' ? 'Mittlere Verfügbarkeit' :
                       'Geringe Verfügbarkeit'}
                    </Badge>
                  </div>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  <div>Produktion: {resource.production}</div>
                  <div>Verbrauch: {resource.consumption}</div>
                  {resource.tradeRisks && resource.tradeRisks.length > 0 && (
                    <div className="mt-2">
                      <div className="font-medium mb-1">Handelsrisiken:</div>
                      {resource.tradeRisks.map((risk, index) => (
                        <div key={index} className="flex items-center gap-1">
                          <AlertTriangle className={`h-4 w-4 ${getRiskSeverityColor(risk.severity)}`} />
                          <span>{risk.description}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {resource.marketFactors && (
                    <div className="mt-2">
                      <div className="font-medium">Marktfaktoren:</div>
                      <div className="text-xs">
                        {resource.marketFactors.priceInfluences.join(', ')}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Popup>
    </Marker>
  );
};