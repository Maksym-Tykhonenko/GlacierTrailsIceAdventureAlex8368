export type GlacierTrailsIcadventreexplrStatusTone =
  | 'positive'
  | 'negative'
  | 'neutral';

export type GlacierTrailsIcadventreexplrRow = {
  id: string;
  name: string;
  coordinates: string;
  glacierType: string;
  location: string;
  status: string;
  statusTone: GlacierTrailsIcadventreexplrStatusTone;
  area: string;
  elevation: string;
  temp: string;
  about: string;
  keyFacts: string[];

  image?: string;
};
