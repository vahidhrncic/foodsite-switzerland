import { Region } from '../types';

export const europeanRegions: Region[] = [
  {
    id: "ch",
    name: "Schweiz",
    resources: [
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
  },
  {
    id: "de",
    name: "Deutschland",
    resources: [
      {
        name: "Fleisch",
        category: "Fleisch",
        production: "8.2M Tonnen",
        consumption: "7.1M Tonnen",
        trend: "stable",
        availability: "high",
        tradeRisks: [
          {
            type: "logistics",
            description: "Kühlkettenmanagement",
            severity: "low"
          }
        ],
        marketFactors: {
          supplyFactors: ["Moderne Landwirtschaft", "Effiziente Produktion"],
          demandFactors: ["Hoher Inlandskonsum", "Exportnachfrage"],
          priceInfluences: ["EU-Marktpreise", "Futterkosten"]
        }
      }
    ],
    coordinates: { x: 10.4515, y: 51.1657 },
    weatherConditions: "Gemäßigtes Klima",
    status: "good",
    marketImportance: "high"
  },
  {
    id: "fr",
    name: "Frankreich",
    resources: [
      {
        name: "Wein",
        category: "Getränke",
        production: "45M Hektoliter",
        consumption: "40M Hektoliter",
        trend: "stable",
        availability: "high",
        tradeRisks: [
          {
            type: "price",
            description: "Wetterabhängige Preisschwankungen",
            severity: "medium"
          }
        ],
        marketFactors: {
          supplyFactors: ["Traditioneller Weinbau", "Klimabedingungen"],
          demandFactors: ["Globale Nachfrage", "Premiumqualität"],
          priceInfluences: ["Erntequantität", "Qualitätsbewertungen"]
        }
      }
    ],
    coordinates: { x: 2.2137, y: 46.2276 },
    weatherConditions: "Verschiedene Klimazonen",
    status: "good",
    marketImportance: "high"
  },
  {
    id: "it",
    name: "Italien",
    resources: [
      {
        name: "Olivenöl",
        category: "Fette",
        production: "300.000 Tonnen",
        consumption: "250.000 Tonnen",
        trend: "stable",
        availability: "high",
        tradeRisks: [
          {
            type: "price",
            description: "Ernteabhängige Preisschwankungen",
            severity: "medium"
          }
        ],
        marketFactors: {
          supplyFactors: ["Traditionelle Produktion", "Wetterabhängigkeit"],
          demandFactors: ["Qualitätsnachfrage", "Export"],
          priceInfluences: ["Ernteertrag", "Qualitätsstandards"]
        }
      }
    ],
    coordinates: { x: 12.5674, y: 41.8719 },
    weatherConditions: "Mediterranes Klima",
    status: "good",
    marketImportance: "high"
  },
  // ... Weitere europäische Länder können hier hinzugefügt werden
];