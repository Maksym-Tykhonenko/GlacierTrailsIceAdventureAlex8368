import type {GlacierTrailsIcadventrejornlArticle} from '../GlacierTrailsIcadventretypes/glaciertrailsIcadventrejornltypes';
import {glaciertrailsIcadventrejornlpack1} from './glaciertrailsIcadventrejornlpack1';
import {glaciertrailsIcadventrejornlpack2} from './glaciertrailsIcadventrejornlpack2';

export const glaciertrailsIcadventrejornlData: GlacierTrailsIcadventrejornlArticle[] =
  [...glaciertrailsIcadventrejornlpack1, ...glaciertrailsIcadventrejornlpack2];

export function glaciertrailsIcadventrejornlGetById(
  id: string,
): GlacierTrailsIcadventrejornlArticle | undefined {
  return glaciertrailsIcadventrejornlData.find(a => a.id === id);
}
