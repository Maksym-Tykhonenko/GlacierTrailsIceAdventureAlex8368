import {
  useNavigation,
  useRoute,
  type RouteProp,
} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React, {useMemo} from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {glaciertrailsIcadventreexplrGetById} from '../GlacierTrailsIcadventredata/glaciertrailsIcadventreexplrindex';
import {glaciertrailsIcadventreexplrResolveImage} from '../GlacierTrailsIcadventredata/glaciertrailsIcadventreexplrimages';
import type {GlacierTrailsIcadventreexplrStackParamList} from '../GlacierTrailsIcadventretypes/glaciertrailsIcadventreexplrnavtypes';
import {useGlacierTrailsIcadventreexplrSaved} from './GlacierTrailsIcadventreexplrsavedctx';
import GlacierTrailsIcadventrelay from '../GlacierTrailsIcadventrecmp/GlacierTrailsIcadventrelay';

const glaciertrailsIcadventreexplrdtlBg = '#144881';
const glaciertrailsIcadventreexplrdtlAccent = '#5BB0D9';
const glaciertrailsIcadventreexplrdtlMuted = '#7E9AB5';
const glaciertrailsIcadventreexplrdtlTitle = '#FFFFFF';
const glaciertrailsIcadventreexplrdtlCard = '#082A4A';
const glaciertrailsIcadventreexplrdtlPos = '#4EC8D9';
const glaciertrailsIcadventreexplrdtlNeg = '#E85A5A';
const glaciertrailsIcadventreexplrdtlNeu = '#8E9AAF';
const glaciertrailsIcadventreexplrdtlBtnDark = '#061E3E';

type GlacierTrailsIcadventreexplrdtlNav = StackNavigationProp<
  GlacierTrailsIcadventreexplrStackParamList,
  'GlacierTrailsIcadventreexplrdtl'
>;

const glaciertrailsIcadventreexplrdtlTone = (
  t: 'positive' | 'negative' | 'neutral',
) => {
  if (t === 'positive') {
    return glaciertrailsIcadventreexplrdtlPos;
  }
  if (t === 'negative') {
    return glaciertrailsIcadventreexplrdtlNeg;
  }
  return glaciertrailsIcadventreexplrdtlNeu;
};

const GlacierTrailsIcadventreexplrdtl = () => {
  const glaciertrailsIcadventreexplrdtlInsets = useSafeAreaInsets();
  const glaciertrailsIcadventreexplrdtlNav =
    useNavigation<GlacierTrailsIcadventreexplrdtlNav>();
  const glaciertrailsIcadventreexplrdtlRoute =
    useRoute<
      RouteProp<
        GlacierTrailsIcadventreexplrStackParamList,
        'GlacierTrailsIcadventreexplrdtl'
      >
    >();
  const glaciertrailsIcadventreexplrdtlSaved =
    useGlacierTrailsIcadventreexplrSaved();

  const glaciertrailsIcadventreexplrdtlG = useMemo(
    () =>
      glaciertrailsIcadventreexplrGetById(
        glaciertrailsIcadventreexplrdtlRoute.params.glacierId,
      ),
    [glaciertrailsIcadventreexplrdtlRoute.params.glacierId],
  );

  if (!glaciertrailsIcadventreexplrdtlG) {
    return (
      <View
        style={[
          styles.glaciertrailsIcadventreexplrdtlRoot,
          styles.glaciertrailsIcadventreexplrdtlMissingRoot,
          {paddingTop: glaciertrailsIcadventreexplrdtlInsets.top + 12},
        ]}>
        <Pressable
          onPress={() => glaciertrailsIcadventreexplrdtlNav.goBack()}
          style={styles.glaciertrailsIcadventreexplrdtlRoundBtn}>
          <Text style={styles.glaciertrailsIcadventreexplrdtlRoundTxt}>‹</Text>
        </Pressable>
        <Text style={styles.glaciertrailsIcadventreexplrdtlMissing}>
          Glacier not found.
        </Text>
      </View>
    );
  }

  const glaciertrailsIcadventreexplrdtlToneCol =
    glaciertrailsIcadventreexplrdtlTone(
      glaciertrailsIcadventreexplrdtlG.statusTone,
    );

  const glaciertrailsIcadventreexplrdtlShare = () => {
    Share.share({
      title: glaciertrailsIcadventreexplrdtlG.name,
      message: `${glaciertrailsIcadventreexplrdtlG.name}\n${glaciertrailsIcadventreexplrdtlG.location}\n${glaciertrailsIcadventreexplrdtlG.coordinates}\n\n${glaciertrailsIcadventreexplrdtlG.about}`,
    }).catch(() => {});
  };

  const glaciertrailsIcadventreexplrdtlMap = () => {
    glaciertrailsIcadventreexplrdtlNav
      .getParent()
      ?.navigate('GlacierTrailsIcadventremap' as never);
  };

  const glaciertrailsIcadventreexplrdtlTitleName =
    glaciertrailsIcadventreexplrdtlG.name.replace(/\s+Glacier$/i, '');

  return (
    <GlacierTrailsIcadventrelay bounce={false}>
      <View style={[styles.glaciertrailsIcadventreexplrdtlRoot]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: glaciertrailsIcadventreexplrdtlInsets.bottom + 28,
          }}>
          <View style={styles.glaciertrailsIcadventreexplrdtlHeroWrap}>
            <ImageBackground
              source={glaciertrailsIcadventreexplrResolveImage(
                glaciertrailsIcadventreexplrdtlG.image,
              )}
              style={styles.glaciertrailsIcadventreexplrdtlHero}
              imageStyle={styles.glaciertrailsIcadventreexplrdtlHeroImg}>
              <View style={styles.glaciertrailsIcadventreexplrdtlHeroBar}>
                <Pressable
                  onPress={() => glaciertrailsIcadventreexplrdtlNav.goBack()}
                  style={styles.glaciertrailsIcadventreexplrdtlRoundBtn}>
                  <Image
                    source={require('../../assets/imgs/glaciertrailsback.png')}
                    style={styles.glaciertrailsIcadventreexplrdtlRoundBtnImg}
                    resizeMode="contain"
                  />
                </Pressable>
                <View style={styles.glaciertrailsIcadventreexplrdtlHeroRight}>
                  <Pressable
                    onPress={() =>
                      glaciertrailsIcadventreexplrdtlSaved.toggleSaved(
                        glaciertrailsIcadventreexplrdtlG.id,
                      )
                    }
                    style={styles.glaciertrailsIcadventreexplrdtlRoundBtn}>
                    <Image
                      source={
                        glaciertrailsIcadventreexplrdtlSaved.isSaved(
                          glaciertrailsIcadventreexplrdtlG.id,
                        )
                          ? require('../../assets/imgs/glaciertrailsnvliked.png')
                          : require('../../assets/imgs/glaciertrailsnvlike.png')
                      }
                      style={
                        glaciertrailsIcadventreexplrdtlSaved.isSaved(
                          glaciertrailsIcadventreexplrdtlG.id,
                        )
                          ? {width: 30.3, height: 30.3, tintColor: '#CC2020'}
                          : {width: 20.2, height: 20.2, tintColor: '#FFFFFF'}
                      }
                      resizeMode="contain"
                    />
                  </Pressable>
                  <Pressable
                    onPress={glaciertrailsIcadventreexplrdtlShare}
                    style={styles.glaciertrailsIcadventreexplrdtlRoundBtn}>
                    <Image
                      source={require('../../assets/imgs/glaciertrailsshare.png')}
                      style={styles.glaciertrailsIcadventreexplrdtlRoundBtnImg}
                      resizeMode="contain"
                    />
                  </Pressable>
                </View>
              </View>
              <View style={styles.glaciertrailsIcadventreexplrdtlTypeBadge}>
                <Text
                  style={styles.glaciertrailsIcadventreexplrdtlTypeTxt}
                  numberOfLines={2}>
                  {glaciertrailsIcadventreexplrdtlG.glacierType}
                </Text>
              </View>
            </ImageBackground>
          </View>

          <View style={styles.glaciertrailsIcadventreexplrdtlBody}>
            <View style={styles.glaciertrailsIcadventreexplrdtlTitleRow}>
              <View>
                <Text style={styles.glaciertrailsIcadventreexplrdtlName}>
                  {glaciertrailsIcadventreexplrdtlTitleName}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8,
                    marginTop: 10,
                  }}>
                  <Image
                    source={require('../../assets/imgs/glaciertrailsloc.png')}
                  />
                  <Text style={styles.glaciertrailsIcadventreexplrdtlLoc}>
                    {glaciertrailsIcadventreexplrdtlG.location}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  styles.glaciertrailsIcadventreexplrdtlStatusPill,
                  {borderColor: glaciertrailsIcadventreexplrdtlToneCol},
                ]}>
                <Text
                  style={[
                    styles.glaciertrailsIcadventreexplrdtlStatusTxt,
                    {color: glaciertrailsIcadventreexplrdtlToneCol},
                  ]}
                  numberOfLines={3}>
                  {glaciertrailsIcadventreexplrdtlG.status}
                </Text>
              </View>
            </View>

            <View style={styles.glaciertrailsIcadventreexplrdtlStats}>
              <View style={styles.glaciertrailsIcadventreexplrdtlStat}>
                <Text style={styles.glaciertrailsIcadventreexplrdtlStatIcon}>
                  ▣
                </Text>
                <Text style={styles.glaciertrailsIcadventreexplrdtlStatVal}>
                  {glaciertrailsIcadventreexplrdtlG.area}
                </Text>
                <Text style={styles.glaciertrailsIcadventreexplrdtlStatLbl}>
                  AREA
                </Text>
              </View>
              <View style={styles.glaciertrailsIcadventreexplrdtlStat}>
                <Text style={styles.glaciertrailsIcadventreexplrdtlStatIcon}>
                  ↑
                </Text>
                <Text style={styles.glaciertrailsIcadventreexplrdtlStatVal}>
                  {glaciertrailsIcadventreexplrdtlG.elevation}
                </Text>
                <Text style={styles.glaciertrailsIcadventreexplrdtlStatLbl}>
                  ELEVATION
                </Text>
              </View>
              <View style={styles.glaciertrailsIcadventreexplrdtlStat}>
                <Text style={styles.glaciertrailsIcadventreexplrdtlStatIcon}>
                  ❄
                </Text>
                <Text style={styles.glaciertrailsIcadventreexplrdtlStatVal}>
                  {glaciertrailsIcadventreexplrdtlG.temp}
                </Text>
                <Text style={styles.glaciertrailsIcadventreexplrdtlStatLbl}>
                  TEMP
                </Text>
              </View>
            </View>

            <View style={styles.glaciertrailsIcadventreexplrdtlCard}>
              <View style={styles.glaciertrailsIcadventreexplrdtlHRow}>
                <View style={styles.glaciertrailsIcadventreexplrdtlHAccent} />
                <Text style={styles.glaciertrailsIcadventreexplrdtlH}>
                  About
                </Text>
              </View>
              <Text style={styles.glaciertrailsIcadventreexplrdtlBodyTxt}>
                {glaciertrailsIcadventreexplrdtlG.about}
              </Text>
            </View>

            <View style={styles.glaciertrailsIcadventreexplrdtlCard}>
              <View style={styles.glaciertrailsIcadventreexplrdtlHRow}>
                <View style={styles.glaciertrailsIcadventreexplrdtlHAccent} />
                <Text style={styles.glaciertrailsIcadventreexplrdtlH}>
                  Key Facts
                </Text>
              </View>
              {glaciertrailsIcadventreexplrdtlG.keyFacts.map((line, i) => (
                <Text
                  key={i}
                  style={styles.glaciertrailsIcadventreexplrdtlFact}>
                  • {line}
                </Text>
              ))}
            </View>

            <Pressable
              onPress={glaciertrailsIcadventreexplrdtlMap}
              style={styles.glaciertrailsIcadventreexplrdtlPrimary}>
              <Text style={styles.glaciertrailsIcadventreexplrdtlPrimaryTxt}>
                Show on Map
              </Text>
            </Pressable>
            <Pressable
              onPress={glaciertrailsIcadventreexplrdtlShare}
              style={styles.glaciertrailsIcadventreexplrdtlGhost}>
              <Image
                source={require('../../assets/imgs/glaciertrailsshar.png')}
              />
              <Text style={styles.glaciertrailsIcadventreexplrdtlGhostTxt}>
                Share this Glacier
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </GlacierTrailsIcadventrelay>
  );
};

export default GlacierTrailsIcadventreexplrdtl;

const styles = StyleSheet.create({
  glaciertrailsIcadventreexplrdtlRoot: {
    flex: 1,
  },
  glaciertrailsIcadventreexplrdtlHeroWrap: {
    paddingHorizontal: 0,
  },
  glaciertrailsIcadventreexplrdtlHero: {
    height: 260,
    justifyContent: 'space-between',
  },
  glaciertrailsIcadventreexplrdtlHeroImg: {},
  glaciertrailsIcadventreexplrdtlHeroBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 58.1,
  },
  glaciertrailsIcadventreexplrdtlHeroRight: {
    flexDirection: 'row',
    gap: 10,
  },
  glaciertrailsIcadventreexplrdtlRoundBtn: {
    width: 40.4,
    height: 40.4,
    borderRadius: 12,
    backgroundColor: '#061220',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glaciertrailsIcadventreexplrdtlRoundBtnImg: {
    width: 20.2,
    height: 20.2,
  },
  glaciertrailsIcadventreexplrdtlRoundTxt: {
    color: glaciertrailsIcadventreexplrdtlTitle,
    fontSize: 22.3,
    fontWeight: '700',
    marginTop: -2,
  },
  glaciertrailsIcadventreexplrdtlHeart: {
    color: '#FFFFFF',
    fontSize: 20.211,
  },
  glaciertrailsIcadventreexplrdtlHeartOn: {
    color: '#CC2020',
  },
  glaciertrailsIcadventreexplrdtlTypeBadge: {
    alignSelf: 'flex-start',
    margin: 16.16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12.12,
    backgroundColor: '#061220',
    borderWidth: 1,
    borderColor: glaciertrailsIcadventreexplrdtlAccent,
    maxWidth: '88%',
  },
  glaciertrailsIcadventreexplrdtlTypeTxt: {
    color: glaciertrailsIcadventreexplrdtlAccent,
    fontSize: 12.12,
    fontWeight: '700',
  },
  glaciertrailsIcadventreexplrdtlMissingRoot: {
    paddingHorizontal: 18,
  },
  glaciertrailsIcadventreexplrdtlMissing: {
    marginTop: 24,
    color: glaciertrailsIcadventreexplrdtlMuted,
    fontSize: 16,
  },
  glaciertrailsIcadventreexplrdtlBody: {
    paddingHorizontal: 18,
    paddingTop: 18,
  },
  glaciertrailsIcadventreexplrdtlTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12.12,
  },
  glaciertrailsIcadventreexplrdtlName: {
    flex: 1,
    color: '#E4F2FA',
    fontSize: 24,
    fontWeight: '800',
  },
  glaciertrailsIcadventreexplrdtlStatusPill: {
    maxWidth: '40%',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: glaciertrailsIcadventreexplrdtlCard,
  },
  glaciertrailsIcadventreexplrdtlStatusTxt: {
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
  },
  glaciertrailsIcadventreexplrdtlCoords: {
    marginTop: 10,
    color: glaciertrailsIcadventreexplrdtlMuted,
    fontSize: 12,
  },
  glaciertrailsIcadventreexplrdtlLoc: {
    color: '#6BA8C8',
    fontSize: 14,
  },
  glaciertrailsIcadventreexplrdtlStats: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 10,
  },
  glaciertrailsIcadventreexplrdtlStat: {
    flex: 1,
    backgroundColor: '#002F6D',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1A3A5C',
  },
  glaciertrailsIcadventreexplrdtlStatIcon: {
    color: glaciertrailsIcadventreexplrdtlAccent,
    fontSize: 16,
    marginBottom: 6,
  },
  glaciertrailsIcadventreexplrdtlStatVal: {
    color: glaciertrailsIcadventreexplrdtlAccent,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  glaciertrailsIcadventreexplrdtlStatLbl: {
    marginTop: 6,
    color: glaciertrailsIcadventreexplrdtlMuted,
    fontSize: 9,
    fontWeight: '500',
    letterSpacing: 0.6,
  },
  glaciertrailsIcadventreexplrdtlCard: {
    marginTop: 18,
    backgroundColor: '#002F6D',
    borderWidth: 1,
    borderColor: '#1A3A5C',
    borderRadius: 18,
    padding: 16,
  },
  glaciertrailsIcadventreexplrdtlHRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  glaciertrailsIcadventreexplrdtlHAccent: {
    width: 3,
    height: 13,
    borderRadius: 2,
    backgroundColor: glaciertrailsIcadventreexplrdtlAccent,
    marginRight: 10,
  },
  glaciertrailsIcadventreexplrdtlH: {
    color: glaciertrailsIcadventreexplrdtlTitle,
    fontSize: 14,
    fontWeight: '700',
  },
  glaciertrailsIcadventreexplrdtlBodyTxt: {
    color: '#6BA8C8',
    fontSize: 14,
    lineHeight: 22,
  },
  glaciertrailsIcadventreexplrdtlFact: {
    color: glaciertrailsIcadventreexplrdtlMuted,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 6,
  },
  glaciertrailsIcadventreexplrdtlPrimary: {
    marginTop: 17,
    backgroundColor: '#4AAAD4',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  glaciertrailsIcadventreexplrdtlPrimaryTxt: {
    color: '#061220',
    fontSize: 15,
    fontWeight: '700',
  },
  glaciertrailsIcadventreexplrdtlGhost: {
    marginTop: 12,
    backgroundColor: '#0A2744',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#13456E',

    flexDirection: 'row',

    gap: 8,
    justifyContent: 'center',
  },
  glaciertrailsIcadventreexplrdtlGhostTxt: {
    color: glaciertrailsIcadventreexplrdtlAccent,
    fontSize: 15,
    fontWeight: '700',
  },
});
