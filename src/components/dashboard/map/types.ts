export type FoodCategory = 
  | 'Getreide'
  | 'Hülsenfrüchte'
  | 'Ölsaaten'
  | 'Gemüse'
  | 'Früchte'
  | 'Milchprodukte'
  | 'Fleisch'
  | 'Gewürze'
  | 'Fette'
  | 'Getränke';

export type TradeRisk = {
  type: 'price' | 'logistics' | 'political' | 'currency';
  description: string;
  severity: 'low' | 'medium' | 'high';
};

export type MarketFactors = {
  supplyFactors: string[];
  demandFactors: string[];
  priceInfluences: string[];
};

export interface Resource {
  name: string;
  category: FoodCategory;
  production: string;
  consumption: string;
  trend: 'up' | 'down' | 'stable';
  availability: 'high' | 'medium' | 'low';
  tradeRisks: TradeRisk[];
  marketFactors: MarketFactors;
  tradingPrice?: {
    value: number;
    currency: string;
    trend: 'up' | 'down' | 'stable';
  };
}

export interface Region {
  id: string;
  name: string;
  resources: Resource[];
  coordinates: { x: number; y: number };
  weatherConditions?: string;
  status: 'good' | 'warning' | 'critical';
  tradeRelations?: string[];
  marketImportance?: 'high' | 'medium' | 'low';
}