import { AlertTriangle } from 'lucide-react';
import { TradeRisk } from '../types';

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

interface RiskIndicatorProps {
  risk: TradeRisk;
}

export const RiskIndicator = ({ risk }: RiskIndicatorProps) => (
  <div className="flex items-center gap-1">
    <AlertTriangle className={`h-4 w-4 ${getRiskSeverityColor(risk.severity)}`} />
    <span>{risk.description}</span>
  </div>
);