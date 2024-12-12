import { Region } from '../types';

export const americanRegions: Region[] = [
  {
    id: "br",
    name: "Brasilien",
    resources: [
      {
        name: "Kaffee",
        category: "Getränke",
        production: "3.5M Tonnen",
        consumption: "1M Tonnen",
        trend: "stable",
        availability: "high",
        tradeRisks: [
          {
            type: "price",
            description: "Hohe Preisvolatilität",
            severity: "high"
          },
          {
            type: "logistics",
            description: "Frostrisiko beeinträchtigt Transport",
            severity: "medium"
          }
        ],
        marketFactors: {
          supplyFactors: ["Anbauflächen", "Wetterbedingungen"],
          demandFactors: ["Globale Nachfrage", "Konsumtrends"],
          priceInfluences: ["Weltmarktpreise", "Erntequalität"]
        }
      }
    ],
    coordinates: { x: -51.9253, y: -14.2350 },
    weatherConditions: "Tropisch",
    status: "good",
    marketImportance: "high"
  }
];