import { Badge } from "@/components/ui/badge";
import { Region } from '../types';
import { ResourceDetails } from './ResourceDetails';

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

interface MarkerPopupProps {
  region: Region;
}

export const MarkerPopup = ({ region }: MarkerPopupProps) => (
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
        <ResourceDetails key={resource.name} resource={resource} />
      ))}
    </div>
  </div>
);