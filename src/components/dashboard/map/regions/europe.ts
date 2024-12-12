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
            severity: "low"
          }
        ],
        marketFactors: {
          supplyFactors: [
            "Graubünden: Alpkäse-Produktion",
            "Emmental: Traditionelle Käseherstellung",
            "Zentralschweiz: Moderne Molkereien"
          ],
          demandFactors: ["Hohe Inlandsnachfrage", "Starker Exportmarkt"],
          priceInfluences: ["Weltmarktpreise", "Qualitätsstandards"]
        }
      },
      {
        name: "Getreide",
        category: "Getreide",
        production: "480.000 Tonnen",
        consumption: "870.000 Tonnen",
        trend: "stable",
        availability: "medium",
        tradeRisks: [
          {
            type: "price",
            description: "Importabhängigkeit",
            severity: "medium"
          }
        ],
        marketFactors: {
          supplyFactors: [
            "Mittelland: Hauptanbaugebiet für Weizen",
            "Waadt: Bedeutende Getreideflächen",
            "Freiburg: Getreideproduktion"
          ],
          demandFactors: ["Brotgetreide", "Futtermittel"],
          priceInfluences: ["Internationale Getreidepreise", "Erntequalität"]
        }
      },
      {
        name: "Fleisch",
        category: "Fleisch",
        production: "475.000 Tonnen",
        consumption: "520.000 Tonnen",
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
          supplyFactors: [
            "St. Gallen: Schweinezucht",
            "Luzern: Geflügelproduktion",
            "Bern: Rinderhaltung"
          ],
          demandFactors: ["Qualitätsfleisch", "Verarbeitete Produkte"],
          priceInfluences: ["Futterkosten", "Qualitätsstandards"]
        }
      },
      {
        name: "Gemüse",
        category: "Gemüse",
        production: "320.000 Tonnen",
        consumption: "780.000 Tonnen",
        trend: "up",
        availability: "medium",
        tradeRisks: [
          {
            type: "logistics",
            description: "Saisonale Verfügbarkeit",
            severity: "medium"
          }
        ],
        marketFactors: {
          supplyFactors: [
            "Seeland: Gemüseanbau",
            "Wallis: Spezialkulturen",
            "Thurgau: Gewächshäuser"
          ],
          demandFactors: ["Frischgemüse", "Verarbeitungsindustrie"],
          priceInfluences: ["Saisonalität", "Wetterbedingungen"]
        }
      },
      {
        name: "Früchte",
        category: "Früchte",
        production: "220.000 Tonnen",
        consumption: "680.000 Tonnen",
        trend: "stable",
        availability: "medium",
        tradeRisks: [
          {
            type: "logistics",
            description: "Importabhängigkeit",
            severity: "medium"
          }
        ],
        marketFactors: {
          supplyFactors: [
            "Wallis: Aprikosen und Äpfel",
            "Thurgau: Apfelanbau",
            "Waadt: Diverse Obstkulturen"
          ],
          demandFactors: ["Frischobst", "Verarbeitete Produkte"],
          priceInfluences: ["Ernteerträge", "Importpreise"]
        }
      }
    ],
    coordinates: { x: 8.2275, y: 46.8182 },
    weatherConditions: "Normale saisonale Bedingungen",
    status: "good",
    marketImportance: "high",
    tradeRelations: [
      "EU: Haupthandelspartner für Agrarprodukte",
      "USA: Import von Spezialitäten",
      "Brasilien: Import von Futtermitteln"
    ]
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
];
