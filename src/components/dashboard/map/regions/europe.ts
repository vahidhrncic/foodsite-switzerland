import { Region } from '../types';

export const europeanRegions: Region[] = [
  {
    id: "ch",
    name: "Schweiz",
    resources: [
      {
        name: "Getreide",
        category: "Getreide",
        production: "450.000 Tonnen",
        consumption: "480.000 Tonnen",
        trend: "stable",
        availability: "high",
        tradeRisks: [
          {
            type: "price",
            description: "Moderate Preisschwankungen",
            severity: "low"
          }
        ],
        marketFactors: {
          supplyFactors: ["Stabile Produktion", "Moderne Landwirtschaft"],
          demandFactors: ["Konstanter Inlandsbedarf"],
          priceInfluences: ["EU-Marktpreise", "Produktionskosten"]
        }
      },
      {
        name: "Milchprodukte",
        category: "Milchprodukte",
        production: "3.4M Tonnen",
        consumption: "2.8M Tonnen",
        trend: "up",
        availability: "high",
        tradeRisks: [
          {
            type: "logistics",
            description: "Kühlkettensicherung",
            severity: "medium"
          }
        ],
        marketFactors: {
          supplyFactors: ["Alpwirtschaft", "Moderne Verarbeitung"],
          demandFactors: ["Export-Nachfrage", "Qualitätsstandards"],
          priceInfluences: ["Weltmarktpreise", "Produktionskosten"]
        }
      }
    ],
    coordinates: { x: 8.2275, y: 46.8182 },
    weatherConditions: "Normale saisonale Bedingungen",
    status: "good",
    marketImportance: "medium"
  }
];