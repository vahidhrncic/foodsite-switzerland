import { Region } from './types';
import { europeanRegions } from './regions/europe';
import { africanRegions } from './regions/africa';
import { americanRegions } from './regions/america';
import { asianRegions } from './regions/asia';
import { otherRegions } from './regions/other-regions';

export const regions: Region[] = [
  ...europeanRegions,
  ...africanRegions,
  ...americanRegions,
  ...asianRegions,
  ...otherRegions
];