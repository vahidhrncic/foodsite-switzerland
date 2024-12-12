import { Badge } from "@/components/ui/badge";
import { Resource } from '../types';
import { RiskIndicator } from './RiskIndicator';
import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon } from 'lucide-react';

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

interface ResourceDetailsProps {
  resource: Resource;
}

export const ResourceDetails = ({ resource }: ResourceDetailsProps) => (
  <div className="border-t pt-2">
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
            <RiskIndicator key={index} risk={risk} />
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
);