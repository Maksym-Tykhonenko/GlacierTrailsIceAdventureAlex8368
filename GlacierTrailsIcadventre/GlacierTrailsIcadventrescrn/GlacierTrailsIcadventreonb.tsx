import React, {useMemo, useState} from 'react';
import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {StackActions, useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import GlacierTrailsIcadventrelay from '../GlacierTrailsIcadventrecmp/GlacierTrailsIcadventrelay';

const glaciertrailsIcadventreonbBg = '#144881';
const glaciertrailsIcadventreonbAccent = '#4AAAD4';
const glaciertrailsIcadventreonbMuted = '#8E9AAF';
const glaciertrailsIcadventreonbTitle = '#FFFFFF';
const glaciertrailsIcadventreonbBtnLabel = '#061220';
const glaciertrailsIcadventreonbIconWrap = '#0D2137';
const glaciertrailsIcadventreonbIconBorder = '#1A3A5C';
const glaciertrailsIcadventreonbDotIdle = '#1A2F45';

type GlacierTrailsIcadventreonbStep = {
  image: ImageSourcePropType;
  title: string;
  body: string;
  cta: string;
};

const glaciertrailsIcadventreonbSteps: GlacierTrailsIcadventreonbStep[] = [
  {
    image: require('../../assets/imgs/glaciertrailsIcadventreonb1.png'),
    title: 'Discover the World’s Glaciers',
    body: 'Explore detailed profiles of glaciers across every continent — from the towering Patagonian ice fields to the remote peaks of the Himalayas.',
    cta: 'Continue',
  },
  {
    image: require('../../assets/imgs/glaciertrailsIcadventreonb2.png'),
    title: 'Navigate Polar Expeditions',
    body: 'Chart your course on our interactive world map. Tap any marker to uncover glacier data, scientific insights, and expedition routes across the frozen frontier.',
    cta: 'Continue',
  },
  {
    image: require('../../assets/imgs/glaciertrailsIcadventreonb3.png'),
    title: 'Calculate & Explore',
    body: 'Use scientific calculators to measure ice mass loss, glacier retreat, and lifetime estimates. Play the ship game, complete challenges, and get explorer badges.',
    cta: 'Start Exploring',
  },
];

const GlacierTrailsIcadventreonbIcon = ({index}: {index: number}) => {
  if (index === 0) {
    return (
      <View
        style={styles.glaciertrailsIcadventreonbIconInner}
        accessibilityLabel="Glacier">
        <Image
          source={require('../../assets/imgs/glaciertrailsIcadventreicn1.png')}
          style={styles.glaciertrailsIcadventreonbIconImage}
        />
      </View>
    );
  }
  if (index === 1) {
    return (
      <View
        style={styles.glaciertrailsIcadventreonbIconInner}
        accessibilityLabel="Map">
        <Image
          source={require('../../assets/imgs/glaciertrailsIcadventreicn2.png')}
        />
      </View>
    );
  }
  return (
    <View
      style={styles.glaciertrailsIcadventreonbIconInner}
      accessibilityLabel="Tools">
      <Image
        source={require('../../assets/imgs/glaciertrailsIcadventreicn3.png')}
      />
    </View>
  );
};

const GlacierTrailsIcadventreonb = () => {
  const glaciertrailsIcadventreonbInsets = useSafeAreaInsets();
  const glaciertrailsIcadventreonbNavigation = useNavigation();
  const [glaciertrailsIcadventreonbIndex, setGlaciertrailsIcadventreonbIndex] =
    useState(0);

  const glaciertrailsIcadventreonbStep = useMemo(
    () => glaciertrailsIcadventreonbSteps[glaciertrailsIcadventreonbIndex],
    [glaciertrailsIcadventreonbIndex],
  );

  const glaciertrailsIcadventreonbFinish = () => {
    glaciertrailsIcadventreonbNavigation.dispatch(
      StackActions.replace('GlacierTrailsIcadventretab'),
    );
  };

  const glaciertrailsIcadventreonbPrimary = () => {
    if (
      glaciertrailsIcadventreonbIndex <
      glaciertrailsIcadventreonbSteps.length - 1
    ) {
      setGlaciertrailsIcadventreonbIndex(i => i + 1);
      return;
    }
    glaciertrailsIcadventreonbFinish();
  };

  return (
    <GlacierTrailsIcadventrelay bounce={false}>
      <View style={{paddingBottom: 22, flex: 1}}>
        <View style={styles.glaciertrailsIcadventreonbHero}>
          <ImageBackground
            source={glaciertrailsIcadventreonbStep.image}
            style={styles.glaciertrailsIcadventreonbHeroImg}
            resizeMode="cover">
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Skip onboarding"
              onPress={glaciertrailsIcadventreonbFinish}
              style={[
                styles.glaciertrailsIcadventreonbSkip,
                {top: glaciertrailsIcadventreonbInsets.top + 10},
              ]}>
              <Text style={styles.glaciertrailsIcadventreonbSkipTxt}>Skip</Text>
            </Pressable>
          </ImageBackground>
        </View>

        <View
          style={[
            styles.glaciertrailsIcadventreonbPanel,
            {paddingBottom: glaciertrailsIcadventreonbInsets.bottom + 8},
          ]}>
          <View>
            <View style={styles.glaciertrailsIcadventreonbIconWrap}>
              <GlacierTrailsIcadventreonbIcon
                index={glaciertrailsIcadventreonbIndex}
              />
            </View>

            <Text style={styles.glaciertrailsIcadventreonbTitle}>
              {glaciertrailsIcadventreonbStep.title}
            </Text>
            <Text style={styles.glaciertrailsIcadventreonbBody}>
              {glaciertrailsIcadventreonbStep.body}
            </Text>
          </View>

          <View>
            <View style={styles.glaciertrailsIcadventreonbDots}>
              {glaciertrailsIcadventreonbSteps.map((_, i) => (
                <React.Fragment key={i}>
                  {i > 0 ? (
                    <View style={styles.glaciertrailsIcadventreonbDotSpacer} />
                  ) : null}
                  <View
                    style={
                      i === glaciertrailsIcadventreonbIndex
                        ? styles.glaciertrailsIcadventreonbDotOn
                        : styles.glaciertrailsIcadventreonbDotOff
                    }
                  />
                </React.Fragment>
              ))}
            </View>

            <Pressable
              accessibilityRole="button"
              onPress={glaciertrailsIcadventreonbPrimary}
              style={({pressed}) => [
                styles.glaciertrailsIcadventreonbCta,
                pressed ? styles.glaciertrailsIcadventreonbCtaPressed : null,
              ]}>
              <Text style={styles.glaciertrailsIcadventreonbCtaTxt}>
                {glaciertrailsIcadventreonbStep.cta}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </GlacierTrailsIcadventrelay>
  );
};

export default GlacierTrailsIcadventreonb;

const styles = StyleSheet.create({
  glaciertrailsIcadventreonbRoot: {
    flex: 1,
    backgroundColor: '#144881',
  },
  glaciertrailsIcadventreonbHero: {
    height: 400.12,
    width: '100%',
  },
  glaciertrailsIcadventreonbHeroImg: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  glaciertrailsIcadventreonbSkip: {
    position: 'absolute',
    right: 18,
    paddingHorizontal: 16.4,
    paddingVertical: 8.2,
    borderRadius: 999,
    backgroundColor: '#0D2137',
    borderWidth: 1,
    borderColor: '#1A3A5C',
  },
  glaciertrailsIcadventreonbSkipTxt: {
    color: glaciertrailsIcadventreonbAccent,
    fontSize: 14,
    fontWeight: '600',
  },
  glaciertrailsIcadventreonbPanel: {
    flex: 1,

    paddingHorizontal: 24,
    paddingTop: 8.2,
    justifyContent: 'space-between',
  },
  glaciertrailsIcadventreonbScrollView: {
    flex: 1,
  },
  glaciertrailsIcadventreonbScroll: {
    alignItems: 'center',
    paddingBottom: 12,
    flexGrow: 1,
  },
  glaciertrailsIcadventreonbIconWrap: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: glaciertrailsIcadventreonbIconWrap,
    borderWidth: 1,
    borderColor: glaciertrailsIcadventreonbIconBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20.1,
    alignSelf: 'center',
    marginTop: 20.1,
  },
  glaciertrailsIcadventreonbIconInner: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glaciertrailsIcadventreonbIconImage: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
  },

  glaciertrailsIcadventreonbCalcBot: {
    width: 26,
    height: 4,
    borderRadius: 2,
    backgroundColor: glaciertrailsIcadventreonbMuted,
  },
  glaciertrailsIcadventreonbTitle: {
    color: glaciertrailsIcadventreonbTitle,
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 12.1,
  },
  glaciertrailsIcadventreonbBody: {
    color: '#6BA8C8',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 42.1,
  },
  glaciertrailsIcadventreonbDots: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glaciertrailsIcadventreonbDotSpacer: {
    width: 8,
  },
  glaciertrailsIcadventreonbDotOn: {
    width: 24,
    height: 8,
    borderRadius: 4,
    backgroundColor: glaciertrailsIcadventreonbAccent,
  },
  glaciertrailsIcadventreonbDotOff: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: glaciertrailsIcadventreonbDotIdle,
  },
  glaciertrailsIcadventreonbCta: {
    marginTop: 32.1,
    backgroundColor: glaciertrailsIcadventreonbAccent,
    borderRadius: 16,
    paddingVertical: 16.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glaciertrailsIcadventreonbCtaPressed: {
    opacity: 0.92,
  },
  glaciertrailsIcadventreonbCtaTxt: {
    color: glaciertrailsIcadventreonbBtnLabel,
    fontSize: 17,
    fontWeight: '700',
  },
});
