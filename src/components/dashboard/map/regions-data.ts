import { Region } from './types';

export const regions: Region[] = [
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
      },
      {
        name: "Kartoffeln",
        category: "Gemüse",
        production: "400.000 Tonnen",
        consumption: "350.000 Tonnen",
        trend: "stable",
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
        availability: "medium"
      },
      {
        name: "Kartoffeln",
        category: "Gemüse",
        production: "10M Tonnen",
        consumption: "9M Tonnen",
        trend: "down",
        availability: "medium"
      }
    ],
    coordinates: { x: 10.4515, y: 51.1657 },
    weatherConditions: "Gemischte Wetterbedingungen",
    status: "warning"
  },
  {
    id: "fr",
    name: "Frankreich",
    resources: [
      {
        name: "Getreide",
        category: "Getreide",
        production: "35M Tonnen",
        consumption: "25M Tonnen",
        trend: "down",
        availability: "low"
      },
      {
        name: "Wein",
        category: "Getränke",
        production: "45M Hektoliter",
        consumption: "40M Hektoliter",
        trend: "stable",
        availability: "medium"
      }
    ],
    coordinates: { x: 2.2137, y: 46.2276 },
    weatherConditions: "Trockenperiode",
    status: "critical"
  }
];