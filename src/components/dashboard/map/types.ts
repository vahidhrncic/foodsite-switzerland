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

export interface Resource {
  name: string;
  category: FoodCategory;
  production: string;
  consumption: string;
  trend: 'up' | 'down' | 'stable';
  availability: 'high' | 'medium' | 'low';
}

export interface Region {
  id: string;
  name: string;
  resources: Resource[];
  coordinates: { x: number; y: number };
  weatherConditions?: string;
  status: 'good' | 'warning' | 'critical';
}