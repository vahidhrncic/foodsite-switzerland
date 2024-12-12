export interface Resource {
  name: string;
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
}