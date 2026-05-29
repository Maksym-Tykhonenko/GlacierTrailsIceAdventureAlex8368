import type {GlacierTrailsIcadventreexplrRow} from '../GlacierTrailsIcadventretypes/glaciertrailsIcadventreexplrtypes';
import raw from './glaciertrailsIcadventreexplrdata.json';

export const glaciertrailsIcadventreexplrData =
  raw as GlacierTrailsIcadventreexplrRow[];

export function glaciertrailsIcadventreexplrGetById(
  id: string,
): GlacierTrailsIcadventreexplrRow | undefined {
  return glaciertrailsIcadventreexplrData.find(g => g.id === id);
}
