import { Region } from './types';

export const regions: Region[] = [
  // Europa
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
        availability: "high"
      },
      {
        name: "Milchprodukte",
        category: "Milchprodukte",
        production: "3.4M Tonnen",
        consumption: "2.8M Tonnen",
        trend: "up",
        availability: "high"
      }
    ],
    coordinates: { x: 8.2275, y: 46.8182 },
    weatherConditions: "Normale saisonale Bedingungen",
    status: "good"
  },
  {
    id: "de",
    name: "Deutschland",
    resources: [
      {
        name: "Weizen",
        category: "Getreide",
        production: "22M Tonnen",
        consumption: "20M Tonnen",
        trend: "stable",
        availability: "high"
      },
      {
        name: "Kartoffeln",
        category: "Gemüse",
        production: "10M Tonnen",
        consumption: "9M Tonnen",
        trend: "stable",
        availability: "high"
      },
      {
        name: "Schweinefleisch",
        category: "Fleisch",
        production: "5M Tonnen",
        consumption: "4.5M Tonnen",
        trend: "stable",
        availability: "high"
      }
    ],
    coordinates: { x: 10.4515, y: 51.1657 },
    weatherConditions: "Gemischte Wetterbedingungen",
    status: "good"
  },
  {
    id: "fr",
    name: "Frankreich",
    resources: [
      {
        name: "Weizen",
        category: "Getreide",
        production: "35M Tonnen",
        consumption: "25M Tonnen",
        trend: "stable",
        availability: "high"
      },
      {
        name: "Wein",
        category: "Getränke",
        production: "45M Hektoliter",
        consumption: "40M Hektoliter",
        trend: "stable",
        availability: "high"
      }
    ],
    coordinates: { x: 2.2137, y: 46.2276 },
    weatherConditions: "Normale Bedingungen",
    status: "good"
  },
  // Afrika
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
        availability: "medium"
      },
      {
        name: "Zuckerrohr",
        category: "Gewürze",
        production: "19M Tonnen",
        consumption: "15M Tonnen",
        trend: "stable",
        availability: "medium"
      }
    ],
    coordinates: { x: 22.9375, y: -30.5595 },
    weatherConditions: "Dürreperioden",
    status: "warning"
  },
  {
    id: "eg",
    name: "Ägypten",
    resources: [
      {
        name: "Weizen",
        category: "Getreide",
        production: "8.5M Tonnen",
        consumption: "20M Tonnen",
        trend: "down",
        availability: "low"
      },
      {
        name: "Reis",
        category: "Getreide",
        production: "6.5M Tonnen",
        consumption: "4M Tonnen",
        trend: "stable",
        availability: "medium"
      }
    ],
    coordinates: { x: 30.8025, y: 26.8206 },
    weatherConditions: "Heiß und trocken",
    status: "critical"
  },
  // Amerika
  {
    id: "us",
    name: "USA",
    resources: [
      {
        name: "Mais",
        category: "Getreide",
        production: "360M Tonnen",
        consumption: "300M Tonnen",
        trend: "up",
        availability: "high"
      },
      {
        name: "Sojabohnen",
        category: "Hülsenfrüchte",
        production: "120M Tonnen",
        consumption: "60M Tonnen",
        trend: "up",
        availability: "high"
      }
    ],
    coordinates: { x: -95.7129, y: 37.0902 },
    weatherConditions: "Verschiedene Klimazonen",
    status: "good"
  },
  {
    id: "br",
    name: "Brasilien",
    resources: [
      {
        name: "Sojabohnen",
        category: "Hülsenfrüchte",
        production: "130M Tonnen",
        consumption: "45M Tonnen",
        trend: "up",
        availability: "high"
      },
      {
        name: "Kaffee",
        category: "Getränke",
        production: "3.5M Tonnen",
        consumption: "1M Tonnen",
        trend: "stable",
        availability: "high"
      }
    ],
    coordinates: { x: -51.9253, y: -14.2350 },
    weatherConditions: "Tropisch",
    status: "good"
  },
  // Asien
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
        availability: "high"
      },
      {
        name: "Weizen",
        category: "Getreide",
        production: "135M Tonnen",
        consumption: "125M Tonnen",
        trend: "stable",
        availability: "high"
      }
    ],
    coordinates: { x: 104.1954, y: 35.8617 },
    weatherConditions: "Verschiedene Klimazonen",
    status: "good"
  },
  {
    id: "in",
    name: "Indien",
    resources: [
      {
        name: "Reis",
        category: "Getreide",
        production: "180M Tonnen",
        consumption: "160M Tonnen",
        trend: "stable",
        availability: "medium"
      },
      {
        name: "Gewürze",
        category: "Gewürze",
        production: "8M Tonnen",
        consumption: "7M Tonnen",
        trend: "up",
        availability: "high"
      }
    ],
    coordinates: { x: 78.9629, y: 20.5937 },
    weatherConditions: "Monsunklima",
    status: "warning"
  },
  {
    id: "jp",
    name: "Japan",
    resources: [
      {
        name: "Reis",
        category: "Getreide",
        production: "7.6M Tonnen",
        consumption: "8.3M Tonnen",
        trend: "down",
        availability: "medium"
      },
      {
        name: "Fisch",
        category: "Fleisch",
        production: "4.3M Tonnen",
        consumption: "7.4M Tonnen",
        trend: "stable",
        availability: "medium"
      }
    ],
    coordinates: { x: 138.2529, y: 36.2048 },
    weatherConditions: "Gemäßigt",
    status: "warning"
  }
];