import { Region } from './types';

export const regions: Region[] = [
  {
    id: "ch",
    name: "Schweiz",
    resources: [
      {
        name: "Getreide",
        production: "450.000 Tonnen",
        consumption: "480.000 Tonnen",
        trend: "stable",
        availability: "high"
      },
      {
        name: "Milchprodukte",
        production: "3.4M Tonnen",
        consumption: "2.8M Tonnen",
        trend: "up",
        availability: "high"
      }
    ],
    coordinates: { x: 8.2275, y: 46.8182 },
    weatherConditions: "Normale saisonale Bedingungen"
  },
  {
    id: "de",
    name: "Deutschland",
    resources: [
      {
        name: "Weizen",
        production: "22M Tonnen",
        consumption: "20M Tonnen",
        trend: "stable",
        availability: "high"
      },
      {
        name: "Kartoffeln",
        production: "10M Tonnen",
        consumption: "9M Tonnen",
        trend: "stable",
        availability: "high"
      }
    ],
    coordinates: { x: 10.4515, y: 51.1657 },
    weatherConditions: "Gemischte Wetterbedingungen"
  },
  {
    id: "fr",
    name: "Frankreich",
    resources: [
      {
        name: "Getreide",
        production: "35M Tonnen",
        consumption: "25M Tonnen",
        trend: "up",
        availability: "high"
      }
    ],
    coordinates: { x: 2.2137, y: 46.2276 },
    weatherConditions: "Gute Wachstumsbedingungen"
  }
];