import { Region } from './types';
import { europeanRegions } from './regions/europe';
import { africanRegions } from './regions/africa';
import { americanRegions } from './regions/america';
import { asianRegions } from './regions/asia';

export const regions: Region[] = [
  ...europeanRegions,
  ...africanRegions,
  ...americanRegions,
  ...asianRegions
];