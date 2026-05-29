export type GlacierTrailsIcadventrecalclCalcKind =
  | 'melt'
  | 'retreat'
  | 'mass'
  | 'life';

export type GlacierTrailsIcadventrecalclStackParamList = {
  GlacierTrailsIcadventrecalclHome: undefined;
  GlacierTrailsIcadventrecalclSaved: undefined;
  GlacierTrailsIcadventrecalclTool: {
    calculator: GlacierTrailsIcadventrecalclCalcKind;
  };
};
