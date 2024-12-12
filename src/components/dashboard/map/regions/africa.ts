import { Region } from '../types';

export const africanRegions: Region[] = [
  {
    id: "za",
    name: "Südafrika",
    resources: [
      {
        name: "Mais",
        category: "Getreide",
        production: "12M Tonnen",
        consumption: "11M Tonnen",
        trend: "down",
        availability: "medium",
        tradeRisks: [
          {
            type: "weather",
            description: "Dürrerisiko",
            severity: "high"
          }
        ],
        marketFactors: {
          supplyFactors: ["Wetterbedingungen", "Wasserverfügbarkeit"],
          demandFactors: ["Regionale Nachfrage", "Exportmärkte"],
          priceInfluences: ["Weltmarktpreise", "Transportkosten"]
        }
      }
    ],
    coordinates: { x: 22.9375, y: -30.5595 },
    weatherConditions: "Dürreperioden",
    status: "warning",
    marketImportance: "medium"
  }
];