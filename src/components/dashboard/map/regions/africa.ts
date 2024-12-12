import { Region } from '../types';

export const africanRegions: Region[] = [
  {
    id: "et",
    name: "Äthiopien",
    resources: [
      {
        name: "Arabica-Kaffee",
        category: "Getränke",
        production: "500.000 Tonnen/Jahr",
        consumption: "100.000 Tonnen/Jahr",
        trend: "up",
        availability: "high",
        tradeRisks: [
          {
            type: "logistics",
            description: "Traditionelle Produktionsmethoden",
            severity: "medium"
          },
          {
            type: "political",
            description: "Regionale Stabilität",
            severity: "medium"
          }
        ],
        marketFactors: {
          supplyFactors: ["Traditioneller Anbau", "Hochland-Klima"],
          demandFactors: ["Hohe Nachfrage aus der Schweiz", "Premium-Qualität"],
          priceInfluences: ["Erntequalität", "Internationale Nachfrage"]
        }
      }
    ],
    coordinates: { x: 40.4897, y: 9.1450 },
    weatherConditions: "Tropisches Hochlandklima",
    status: "good",
    marketImportance: "high"
  },
  {
    id: "ug",
    name: "Uganda",
    resources: [
      {
        name: "Robusta-Kaffee",
        category: "Getränke",
        production: "300.000 Tonnen/Jahr",
        consumption: "50.000 Tonnen/Jahr",
        trend: "up",
        availability: "high",
        tradeRisks: [
          {
            type: "logistics",
            description: "Transportinfrastruktur",
            severity: "medium"
          }
        ],
        marketFactors: {
          supplyFactors: ["Große Anbauflächen", "Günstige Klimabedingungen"],
          demandFactors: ["Nachfrage für Kaffeemischungen", "Preiswerte Alternative"],
          priceInfluences: ["Weltmarktpreise", "Transportkosten"]
        }
      }
    ],
    coordinates: { x: 32.2903, y: 1.3733 },
    weatherConditions: "Tropisches Klima",
    status: "good",
    marketImportance: "medium"
  },
  {
    id: "ke",
    name: "Kenia",
    resources: [
      {
        name: "Premium Arabica-Kaffee",
        category: "Getränke",
        production: "50.000 Tonnen/Jahr",
        consumption: "5.000 Tonnen/Jahr",
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
    marketImportance: "high"
  },
  {
    id: "ci",
    name: "Elfenbeinküste",
    resources: [
      {
        name: "Kakao",
        category: "Getränke",
        production: "2.000.000 Tonnen/Jahr",
        consumption: "100.000 Tonnen/Jahr",
        trend: "up",
        availability: "high",
        tradeRisks: [
          {
            type: "political",
            description: "Handelsstabilität",
            severity: "medium"
          }
        ],
        marketFactors: {
          supplyFactors: ["Größter Kakaoproduzent", "Traditioneller Anbau"],
          demandFactors: ["Schweizer Schokoladenindustrie", "Hohe Qualität"],
          priceInfluences: ["Weltmarktnachfrage", "Erntebedingungen"]
        }
      }
    ],
    coordinates: { x: -5.5471, y: 7.5400 },
    weatherConditions: "Tropisches Klima",
    status: "warning",
    marketImportance: "high"
  },
  {
    id: "rw",
    name: "Ruanda",
    resources: [
      {
        name: "Bourbon-Arabica",
        category: "Getränke",
        production: "20.000 Tonnen/Jahr",
        consumption: "2.000 Tonnen/Jahr",
        trend: "up",
        availability: "medium",
        tradeRisks: [
          {
            type: "logistics",
            description: "Binnenland-Transport",
            severity: "medium"
          }
        ],
        marketFactors: {
          supplyFactors: ["Spezialitätenanbau", "Hochlandlage"],
          demandFactors: ["Premium-Segment", "Direkthandel"],
          priceInfluences: ["Qualitätsbewertung", "Spezialitätenmarkt"]
        }
      }
    ],
    coordinates: { x: 29.8739, y: -1.9403 },
    weatherConditions: "Tropisches Hochland",
    status: "good",
    marketImportance: "medium"
  },
  {
    id: "tz",
    name: "Tansania",
    resources: [
      {
        name: "Kilimandscharo-Kaffee",
        category: "Getränke",
        production: "60.000 Tonnen/Jahr",
        consumption: "5.000 Tonnen/Jahr",
        trend: "stable",
        availability: "medium",
        tradeRisks: [
          {
            type: "logistics",
            description: "Transportwege",
            severity: "medium"
          }
        ],
        marketFactors: {
          supplyFactors: ["Berganbau", "Traditionelle Methoden"],
          demandFactors: ["Spezialitätenmarkt", "Faire Handelsbedingungen"],
          priceInfluences: ["Qualität", "Nachhaltigkeitszertifizierung"]
        }
      }
    ],
    coordinates: { x: 34.8888, y: -6.3690 },
    weatherConditions: "Variierend nach Region",
    status: "good",
    marketImportance: "medium"
  },
  {
    id: "cm",
    name: "Kamerun",
    resources: [
      {
        name: "Robusta-Kaffee",
        category: "Getränke",
        production: "100.000 Tonnen/Jahr",
        consumption: "10.000 Tonnen/Jahr",
        trend: "stable",
        availability: "medium",
        tradeRisks: [
          {
            type: "political",
            description: "Regionale Stabilität",
            severity: "medium"
          }
        ],
        marketFactors: {
          supplyFactors: ["Traditioneller Anbau", "Diverse Anbauregionen"],
          demandFactors: ["Mischungskomponente", "Preiswerte Qualität"],
          priceInfluences: ["Weltmarktpreise", "Regionale Stabilität"]
        }
      }
    ],
    coordinates: { x: 12.3547, y: 7.3697 },
    weatherConditions: "Tropisch bis Subtropisch",
    status: "warning",
    marketImportance: "medium"
  },
  {
    id: "bi",
    name: "Burundi",
    resources: [
      {
        name: "Arabica-Kaffee",
        category: "Getränke",
        production: "15.000 Tonnen/Jahr",
        consumption: "1.000 Tonnen/Jahr",
        trend: "up",
        availability: "medium",
        tradeRisks: [
          {
            type: "logistics",
            description: "Binnenland-Transport",
            severity: "high"
          }
        ],
        marketFactors: {
          supplyFactors: ["Kleinbauern", "Hochland-Anbau"],
          demandFactors: ["Spezialitätenmarkt", "Komplexes Aromaprofil"],
          priceInfluences: ["Qualitätsbewertung", "Transportkosten"]
        }
      }
    ],
    coordinates: { x: 29.9189, y: -3.3731 },
    weatherConditions: "Tropisches Hochland",
    status: "warning",
    marketImportance: "medium"
  }
];