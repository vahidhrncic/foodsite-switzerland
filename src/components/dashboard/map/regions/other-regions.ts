import { Region } from '../types';

export const otherRegions: Region[] = [
  {
    id: "us",
    name: "USA",
    resources: [
      {
        name: "Mais",
        category: "Getreide",
        production: "360M Tonnen",
        consumption: "310M Tonnen",
        trend: "stable",
        availability: "high",
        tradeRisks: [
          {
            type: "logistics",
            description: "Lange Transportwege",
            severity: "medium"
          }
        ],
        marketFactors: {
          supplyFactors: ["Große Anbauflächen", "Moderne Landwirtschaft"],
          demandFactors: ["Globale Nachfrage", "Bioethanol-Produktion"],
          priceInfluences: ["Weltmarktpreise", "Wetterbedingungen"]
        }
      }
    ],
    coordinates: { x: -95.7129, y: 37.0902 },
    weatherConditions: "Verschiedene Klimazonen",
    status: "good",
    marketImportance: "high"
  },
  {
    id: "gb",
    name: "Großbritannien",
    resources: [
      {
        name: "Weizen",
        category: "Getreide",
        production: "13M Tonnen",
        consumption: "15M Tonnen",
        trend: "stable",
        availability: "medium",
        tradeRisks: [
          {
            type: "political",
            description: "Brexit-Auswirkungen",
            severity: "medium"
          }
        ],
        marketFactors: {
          supplyFactors: ["Traditioneller Anbau", "Moderne Technologie"],
          demandFactors: ["Inlandsnachfrage", "Exportmärkte"],
          priceInfluences: ["EU-Marktpreise", "Handelspolitik"]
        }
      }
    ],
    coordinates: { x: -3.4359, y: 55.3781 },
    weatherConditions: "Gemäßigtes Klima",
    status: "warning",
    marketImportance: "medium"
  },
  {
    id: "ua",
    name: "Ukraine",
    resources: [
      {
        name: "Weizen",
        category: "Getreide",
        production: "25M Tonnen",
        consumption: "8M Tonnen",
        trend: "down",
        availability: "medium",
        tradeRisks: [
          {
            type: "political",
            description: "Geopolitische Spannungen",
            severity: "high"
          }
        ],
        marketFactors: {
          supplyFactors: ["Große Anbauflächen", "Schwarzerde"],
          demandFactors: ["Globale Nachfrage", "Exportmärkte"],
          priceInfluences: ["Politische Situation", "Transportwege"]
        }
      }
    ],
    coordinates: { x: 31.1656, y: 48.3794 },
    weatherConditions: "Kontinentalklima",
    status: "critical",
    marketImportance: "high"
  },
  {
    id: "tr",
    name: "Türkei",
    resources: [
      {
        name: "Haselnüsse",
        category: "Früchte",
        production: "600.000 Tonnen",
        consumption: "100.000 Tonnen",
        trend: "stable",
        availability: "high",
        tradeRisks: [
          {
            type: "price",
            description: "Währungsschwankungen",
            severity: "medium"
          }
        ],
        marketFactors: {
          supplyFactors: ["Größter Produzent weltweit", "Klimabedingungen"],
          demandFactors: ["Schokoladenindustrie", "Snackproduktion"],
          priceInfluences: ["Ernteerträge", "Währungskurs"]
        }
      }
    ],
    coordinates: { x: 35.2433, y: 38.9637 },
    weatherConditions: "Mediterranes Klima",
    status: "good",
    marketImportance: "high"
  },
  {
    id: "in",
    name: "Indien",
    resources: [
      {
        name: "Basmati Reis",
        category: "Getreide",
        production: "2.5M Tonnen",
        consumption: "1.5M Tonnen",
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
          supplyFactors: ["Traditioneller Anbau", "Monsunabhängigkeit"],
          demandFactors: ["Globale Nachfrage", "Premium-Segment"],
          priceInfluences: ["Erntequalität", "Exportquoten"]
        }
      }
    ],
    coordinates: { x: 78.9629, y: 20.5937 },
    weatherConditions: "Monsunklima",
    status: "good",
    marketImportance: "high"
  },
  {
    id: "rs",
    name: "Serbien",
    resources: [
      {
        name: "Himbeeren",
        category: "Früchte",
        production: "120.000 Tonnen",
        consumption: "20.000 Tonnen",
        trend: "stable",
        availability: "high",
        tradeRisks: [
          {
            type: "logistics",
            description: "Kühlkette",
            severity: "medium"
          }
        ],
        marketFactors: {
          supplyFactors: ["Größter Exporteur", "Ideales Klima"],
          demandFactors: ["Lebensmittelindustrie", "Frischmarkt"],
          priceInfluences: ["Erntequalität", "Saisonalität"]
        }
      }
    ],
    coordinates: { x: 21.0059, y: 44.0165 },
    weatherConditions: "Kontinentalklima",
    status: "good",
    marketImportance: "medium"
  }
];