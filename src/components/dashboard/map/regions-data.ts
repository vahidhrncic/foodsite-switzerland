import { Region } from './types';

export const regions: Region[] = [
  {
    id: "eu",
    name: "European Union",
    resources: [
      {
        name: "Wheat",
        production: "135M tons",
        consumption: "120M tons",
        trend: "stable",
        availability: "high"
      },
      {
        name: "Dairy",
        production: "155M tons",
        consumption: "145M tons",
        trend: "up",
        availability: "high"
      }
    ],
    coordinates: { x: 15, y: 50 },
    weatherConditions: "Normal seasonal conditions"
  },
  {
    id: "na",
    name: "North America",
    resources: [
      {
        name: "Corn",
        production: "360M tons",
        consumption: "310M tons",
        trend: "up",
        availability: "high"
      },
      {
        name: "Soybeans",
        production: "120M tons",
        consumption: "60M tons",
        trend: "stable",
        availability: "medium"
      }
    ],
    coordinates: { x: -100, y: 40 },
    weatherConditions: "Drought in midwest regions"
  },
  {
    id: "sa",
    name: "South America",
    resources: [
      {
        name: "Coffee",
        production: "85M tons",
        consumption: "25M tons",
        trend: "down",
        availability: "medium"
      },
      {
        name: "Sugar",
        production: "45M tons",
        consumption: "30M tons",
        trend: "stable",
        availability: "high"
      }
    ],
    coordinates: { x: -60, y: -15 },
    weatherConditions: "Heavy rainfall affecting harvests"
  }
];