import { Region } from '../types';

export const asianRegions: Region[] = [
  {
    id: "cn",
    name: "China",
    resources: [
      {
        name: "Reis",
        category: "Getreide",
        production: "210M Tonnen",
        consumption: "195M Tonnen",
        trend: "stable",
        availability: "high",
        tradeRisks: [
          {
            type: "political",
            description: "Handelspolitik",
            severity: "medium"
          }
        ],
        marketFactors: {
          supplyFactors: ["Anbauflächen", "Technologisierung"],
          demandFactors: ["Bevölkerungswachstum", "Ernährungsgewohnheiten"],
          priceInfluences: ["Staatliche Regulierung", "Produktionskosten"]
        }
      }
    ],
    coordinates: { x: 104.1954, y: 35.8617 },
    weatherConditions: "Verschiedene Klimazonen",
    status: "good",
    marketImportance: "high"
  }
];