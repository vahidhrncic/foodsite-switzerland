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
  },
  {
    id: "ar",
    name: "Argentinien",
    resources: [
      {
        name: "Rindfleisch",
        category: "Fleisch",
        production: "3.1M Tonnen/Jahr",
        consumption: "2.4M Tonnen/Jahr",
        trend: "up",
        availability: "high",
        tradeRisks: [
          {
            type: "currency",
            description: "Währungsvolatilität",
            severity: "high"
          }
        ],
        marketFactors: {
          supplyFactors: ["Extensive Weidehaltung", "Qualitätszucht"],
          demandFactors: ["Premium-Fleischmarkt", "Export-Nachfrage"],
          priceInfluences: ["Weltmarktpreise", "Währungskurs"]
        }
      }
    ],
    coordinates: { x: -63.6167, y: -38.4161 },
    weatherConditions: "Gemäßigtes Klima",
    status: "good",
    marketImportance: "high"
  },
  {
    id: "ie",
    name: "Irland",
    resources: [
      {
        name: "Milchprodukte",
        category: "Milchprodukte",
        production: "8.3M Tonnen/Jahr",
        consumption: "1M Tonnen/Jahr",
        trend: "up",
        availability: "high",
        tradeRisks: [
          {
            type: "logistics",
            description: "Transportketten",
            severity: "low"
          }
        ],
        marketFactors: {
          supplyFactors: ["Grünlandwirtschaft", "Moderne Verarbeitung"],
          demandFactors: ["EU-Markt", "Qualitätsprodukte"],
          priceInfluences: ["EU-Marktpreise", "Nachfrage"]
        }
      }
    ],
    coordinates: { x: -8.2439, y: 53.4129 },
    weatherConditions: "Maritimes Klima",
    status: "good",
    marketImportance: "medium"
  },
  {
    id: "au",
    name: "Australien",
    resources: [
      {
        name: "Weizen",
        category: "Getreide",
        production: "33M Tonnen/Jahr",
        consumption: "8M Tonnen/Jahr",
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
          demandFactors: ["Asiatischer Markt", "Exportqualität"],
          priceInfluences: ["Weltmarktpreise", "Wetterbedingungen"]
        }
      }
    ],
    coordinates: { x: 133.7751, y: -25.2744 },
    weatherConditions: "Verschiedene Klimazonen",
    status: "good",
    marketImportance: "high"
  },
  {
    id: "ca",
    name: "Kanada",
    resources: [
      {
        name: "Raps",
        category: "Ölsaaten",
        production: "19M Tonnen/Jahr",
        consumption: "10M Tonnen/Jahr",
        trend: "up",
        availability: "high",
        tradeRisks: [
          {
            type: "logistics",
            description: "Transportinfrastruktur",
            severity: "low"
          }
        ],
        marketFactors: {
          supplyFactors: ["Große Anbauflächen", "Moderne Technologie"],
          demandFactors: ["Globale Nachfrage", "Bioenergie"],
          priceInfluences: ["Ölpreise", "Ernteerträge"]
        }
      }
    ],
    coordinates: { x: -106.3468, y: 56.1304 },
    weatherConditions: "Kontinentalklima",
    status: "good",
    marketImportance: "high"
  },
  {
    id: "ba",
    name: "Bosnien & Herzegowina",
    resources: [
      {
        name: "Himbeeren",
        category: "Früchte",
        production: "25.000 Tonnen/Jahr",
        consumption: "5.000 Tonnen/Jahr",
        trend: "up",
        availability: "medium",
        tradeRisks: [
          {
            type: "logistics",
            description: "Kühlkette",
            severity: "medium"
          }
        ],
        marketFactors: {
          supplyFactors: ["Kleinbauernwirtschaft", "Günstige Klimabedingungen"],
          demandFactors: ["EU-Markt", "Bio-Qualität"],
          priceInfluences: ["Saisonalität", "Transportkosten"]
        }
      }
    ],
    coordinates: { x: 17.6791, y: 43.9159 },
    weatherConditions: "Kontinentalklima",
    status: "good",
    marketImportance: "medium"
  },
  {
    id: "hr",
    name: "Kroatien",
    resources: [
      {
        name: "Olivenöl",
        category: "Fette",
        production: "50.000 Tonnen/Jahr",
        consumption: "30.000 Tonnen/Jahr",
        trend: "up",
        availability: "medium",
        tradeRisks: [
          {
            type: "price",
            description: "Saisonale Schwankungen",
            severity: "medium"
          }
        ],
        marketFactors: {
          supplyFactors: ["Traditionelle Produktion", "Küstenregionen"],
          demandFactors: ["EU-Markt", "Premium-Segment"],
          priceInfluences: ["Ernteertrag", "Qualitätsbewertung"]
        }
      }
    ],
    coordinates: { x: 15.2000, y: 45.1000 },
    weatherConditions: "Mediterranes Klima",
    status: "good",
    marketImportance: "medium"
  }
];
