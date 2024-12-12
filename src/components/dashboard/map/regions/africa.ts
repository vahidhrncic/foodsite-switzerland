import { Region } from '../types';

export const africanRegions: Region[] = [
  {
    id: "et",
    name: "Äthiopien",
    resources: [
      {
        name: "Kaffee",
        category: "Getränke",
        production: "500.000 Tonnen",
        consumption: "100.000 Tonnen",
        trend: "up",
        availability: "high",
        tradeRisks: [
          {
            type: "logistics",
            description: "Transportinfrastruktur",
            severity: "medium"
          },
          {
            type: "political",
            description: "Regionale Stabilität",
            severity: "medium"
          }
        ],
        marketFactors: {
          supplyFactors: ["Traditioneller Anbau", "Klimabedingungen"],
          demandFactors: ["Globale Nachfrage", "Qualitätsstandards"],
          priceInfluences: ["Erntequalität", "Transportkosten"]
        }
      }
    ],
    coordinates: { x: 40.4897, y: 9.1450 },
    weatherConditions: "Tropisches Hochland",
    status: "warning",
    marketImportance: "high"
  },
  {
    id: "ke",
    name: "Kenia",
    resources: [
      {
        name: "Kaffee",
        category: "Getränke",
        production: "50.000 Tonnen",
        consumption: "5.000 Tonnen",
        trend: "stable",
        availability: "medium",
        tradeRisks: [
          {
            type: "logistics",
            description: "Transportkosten",
            severity: "medium"
          }
        ],
        marketFactors: {
          supplyFactors: ["Qualitätsanbau", "Moderne Verarbeitung"],
          demandFactors: ["Premiummarkt", "Spezialitätenkaffee"],
          priceInfluences: ["Qualitätsbewertung", "Weltmarktpreise"]
        }
      }
    ],
    coordinates: { x: 37.9062, y: 0.0236 },
    weatherConditions: "Tropisches Hochland",
    status: "good",
    marketImportance: "medium"
  }
];