import type {ImageSourcePropType} from 'react-native';

const glaciertrailsIcadventreexplrFallback: ImageSourcePropType = require('../../assets/imgs/glaciertrailsIcadvloadbg.png');

const glaciertrailsIcadventreexplrPlaceByIndex: Record<
  number,
  ImageSourcePropType
> = {
  1: require('../../assets/imgs/glaciertrailsplace1.png'),
  2: require('../../assets/imgs/glaciertrailsplace2.png'),
  3: require('../../assets/imgs/glaciertrailsplace3.png'),
  4: require('../../assets/imgs/glaciertrailsplace4.png'),
  5: require('../../assets/imgs/glaciertrailsplace5.png'),
  6: require('../../assets/imgs/glaciertrailsplace6.png'),
  7: require('../../assets/imgs/glaciertrailsplace7.png'),
  8: require('../../assets/imgs/glaciertrailsplace8.png'),
  9: require('../../assets/imgs/glaciertrailsplace9.png'),
  10: require('../../assets/imgs/glaciertrailsplace10.png'),
  11: require('../../assets/imgs/glaciertrailsplace11.png'),
  12: require('../../assets/imgs/glaciertrailsplace12.png'),
  13: require('../../assets/imgs/glaciertrailsplace13.png'),
  14: require('../../assets/imgs/glaciertrailsplace14.png'),
  15: require('../../assets/imgs/glaciertrailsplace15.png'),
  16: require('../../assets/imgs/glaciertrailsplace16.png'),
  17: require('../../assets/imgs/glaciertrailsplace17.png'),
  18: require('../../assets/imgs/glaciertrailsplace18.png'),
  19: require('../../assets/imgs/glaciertrailsplace19.png'),
  20: require('../../assets/imgs/glaciertrailsplace20.png'),
};

export function glaciertrailsIcadventreexplrResolveImage(
  raw: unknown,
): ImageSourcePropType {
  if (raw == null) {
    return glaciertrailsIcadventreexplrFallback;
  }
  if (
    typeof raw === 'number' &&
    glaciertrailsIcadventreexplrPlaceByIndex[raw]
  ) {
    return glaciertrailsIcadventreexplrPlaceByIndex[raw];
  }
  if (typeof raw !== 'string') {
    return glaciertrailsIcadventreexplrFallback;
  }
  const glaciertrailsIcadventreexplrMatch = raw.match(/place(\d+)/i);
  if (!glaciertrailsIcadventreexplrMatch) {
    return glaciertrailsIcadventreexplrFallback;
  }
  let glaciertrailsIcadventreexplrN = parseInt(
    glaciertrailsIcadventreexplrMatch[1],
    10,
  );
  if (
    Number.isNaN(glaciertrailsIcadventreexplrN) ||
    glaciertrailsIcadventreexplrN < 1
  ) {
    return glaciertrailsIcadventreexplrFallback;
  }
  if (glaciertrailsIcadventreexplrN > 20) {
    glaciertrailsIcadventreexplrN =
      ((glaciertrailsIcadventreexplrN - 1) % 20) + 1;
  }
  return (
    glaciertrailsIcadventreexplrPlaceByIndex[glaciertrailsIcadventreexplrN] ??
    glaciertrailsIcadventreexplrFallback
  );
}
