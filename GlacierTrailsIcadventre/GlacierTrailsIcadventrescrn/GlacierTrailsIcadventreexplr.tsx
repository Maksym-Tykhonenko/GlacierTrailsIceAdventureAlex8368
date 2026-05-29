import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useMemo, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import type {GlacierTrailsIcadventreexplrRow} from '../GlacierTrailsIcadventretypes/glaciertrailsIcadventreexplrtypes';
import {glaciertrailsIcadventreexplrData} from '../GlacierTrailsIcadventredata/glaciertrailsIcadventreexplrindex';
import {glaciertrailsIcadventreexplrResolveImage} from '../GlacierTrailsIcadventredata/glaciertrailsIcadventreexplrimages';
import type {GlacierTrailsIcadventreexplrStackParamList} from '../GlacierTrailsIcadventretypes/glaciertrailsIcadventreexplrnavtypes';
import {useGlacierTrailsIcadventreexplrSaved} from './GlacierTrailsIcadventreexplrsavedctx';
import GlacierTrailsIcadventrelay from '../GlacierTrailsIcadventrecmp/GlacierTrailsIcadventrelay';

const glaciertrailsIcadventreexplrBg = '#144881';
const glaciertrailsIcadventreexplrSearchBg = '#0C2748';
const glaciertrailsIcadventreexplrAccent = '#5BB0D9';
const glaciertrailsIcadventreexplrMuted = '#7E9AB5';
const glaciertrailsIcadventreexplrTitle = '#E4F2FA';
const glaciertrailsIcadventreexplrCardBg = '#082A4A';
const glaciertrailsIcadventreexplrPos = '#4EC8D9';
const glaciertrailsIcadventreexplrNeg = '#E85A5A';
const glaciertrailsIcadventreexplrNeu = '#8E9AAF';

type GlacierTrailsIcadventreexplrNav = StackNavigationProp<
  GlacierTrailsIcadventreexplrStackParamList,
  'GlacierTrailsIcadventreexplrHome'
>;

const glaciertrailsIcadventreexplrToneColor = (
  t: GlacierTrailsIcadventreexplrRow['statusTone'],
) => {
  if (t === 'positive') {
    return glaciertrailsIcadventreexplrPos;
  }
  if (t === 'negative') {
    return glaciertrailsIcadventreexplrNeg;
  }
  return glaciertrailsIcadventreexplrNeu;
};

const GlacierTrailsIcadventreexplrListRow = ({
  item,
  onOpen,
}: {
  item: GlacierTrailsIcadventreexplrRow;
  onOpen: (id: string) => void;
}) => {
  const glaciertrailsIcadventreexplrSaved =
    useGlacierTrailsIcadventreexplrSaved();
  const glaciertrailsIcadventreexplrTone =
    glaciertrailsIcadventreexplrToneColor(item.statusTone);

  return (
    <View style={styles.glaciertrailsIcadventreexplrCardOuter}>
      <View style={styles.glaciertrailsIcadventreexplrCardInner}>
        <ImageBackground
          source={glaciertrailsIcadventreexplrResolveImage(item.image)}
          style={styles.glaciertrailsIcadventreexplrHero}
          imageStyle={styles.glaciertrailsIcadventreexplrHeroImg}>
          <Pressable
            onPress={() => onOpen(item.id)}
            style={styles.glaciertrailsIcadventreexplrHeroTap}>
            <View style={styles.glaciertrailsIcadventreexplrHeroTopSpacer} />
            <View style={styles.glaciertrailsIcadventreexplrTypeBadge}>
              <Text
                style={styles.glaciertrailsIcadventreexplrTypeBadgeTxt}
                numberOfLines={1}>
                {item.glacierType}
              </Text>
            </View>
          </Pressable>
          <Pressable
            hitSlop={12}
            onPress={() =>
              glaciertrailsIcadventreexplrSaved.toggleSaved(item.id)
            }
            style={styles.glaciertrailsIcadventreexplrHeartBtn}>
            <Image
              source={
                glaciertrailsIcadventreexplrSaved.isSaved(item.id)
                  ? require('../../assets/imgs/glaciertrailsnvliked.png')
                  : require('../../assets/imgs/glaciertrailsnvlike.png')
              }
              style={
                glaciertrailsIcadventreexplrSaved.isSaved(item.id)
                  ? {
                      width: 30,
                      height: 30,

                      tintColor: '#CC2020',
                    }
                  : {
                      width: 20,
                      height: 20,

                      tintColor: '#FFFFFF',
                    }
              }
            />
          </Pressable>
        </ImageBackground>

        <Pressable
          onPress={() => onOpen(item.id)}
          style={({pressed}) => [
            styles.glaciertrailsIcadventreexplrCardBody,
            pressed && styles.glaciertrailsIcadventreexplrCardPressed,
          ]}>
          <View style={styles.glaciertrailsIcadventreexplrNameRow}>
            <Text
              style={styles.glaciertrailsIcadventreexplrName}
              numberOfLines={2}>
              {item.name}
            </Text>
            <View
              style={[
                styles.glaciertrailsIcadventreexplrStatusPill,
                {borderColor: glaciertrailsIcadventreexplrTone},
              ]}>
              <Text
                style={[
                  styles.glaciertrailsIcadventreexplrStatusTxt,
                  {color: glaciertrailsIcadventreexplrTone},
                ]}
                numberOfLines={2}>
                {item.status}
              </Text>
            </View>
          </View>

          <View style={styles.glaciertrailsIcadventreexplrLocRow}>
            <Image
              source={require('../../assets/imgs/glaciertrailsloc.png')}
              style={styles.glaciertrailsIcadventreexplrLocIcon}
            />
            <Text
              style={styles.glaciertrailsIcadventreexplrLoc}
              numberOfLines={2}>
              {item.location}
            </Text>
          </View>
          <View style={styles.glaciertrailsIcadventreexplrStatsRow}>
            <View style={styles.glaciertrailsIcadventreexplrStat}>
              <Text style={styles.glaciertrailsIcadventreexplrStatVal}>
                {item.area}
              </Text>
              <Text style={styles.glaciertrailsIcadventreexplrStatLbl}>
                AREA
              </Text>
            </View>
            <View style={styles.glaciertrailsIcadventreexplrStat}>
              <Text style={styles.glaciertrailsIcadventreexplrStatVal}>
                {item.elevation}
              </Text>
              <Text style={styles.glaciertrailsIcadventreexplrStatLbl}>
                ELEVATION
              </Text>
            </View>
            <View style={styles.glaciertrailsIcadventreexplrStat}>
              <Text style={styles.glaciertrailsIcadventreexplrStatVal}>
                {item.temp}
              </Text>
              <Text style={styles.glaciertrailsIcadventreexplrStatLbl}>
                TEMP
              </Text>
            </View>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const GlacierTrailsIcadventreexplr = () => {
  const glaciertrailsIcadventreexplrInsets = useSafeAreaInsets();
  const glaciertrailsIcadventreexplrNav =
    useNavigation<GlacierTrailsIcadventreexplrNav>();
  const glaciertrailsIcadventreexplrSaved =
    useGlacierTrailsIcadventreexplrSaved();
  const [
    glaciertrailsIcadventreexplrQuery,
    setGlaciertrailsIcadventreexplrQuery,
  ] = useState('');
  const [
    glaciertrailsIcadventreexplrMode,
    setGlaciertrailsIcadventreexplrMode,
  ] = useState<'all' | 'saved'>('all');

  const glaciertrailsIcadventreexplrFiltered = useMemo(() => {
    const glaciertrailsIcadventreexplrQ = glaciertrailsIcadventreexplrQuery
      .trim()
      .toLowerCase();
    return glaciertrailsIcadventreexplrData.filter(g => {
      if (
        glaciertrailsIcadventreexplrMode === 'saved' &&
        !glaciertrailsIcadventreexplrSaved.isSaved(g.id)
      ) {
        return false;
      }
      if (!glaciertrailsIcadventreexplrQ) {
        return true;
      }
      const glaciertrailsIcadventreexplrHay = [
        g.name,
        g.location,
        g.glacierType,
        g.status,
        g.coordinates,
      ]
        .join(' ')
        .toLowerCase();
      return glaciertrailsIcadventreexplrHay.includes(
        glaciertrailsIcadventreexplrQ,
      );
    });
  }, [
    glaciertrailsIcadventreexplrQuery,
    glaciertrailsIcadventreexplrMode,
    glaciertrailsIcadventreexplrSaved,
  ]);

  const glaciertrailsIcadventreexplrOpen = useCallback(
    (id: string) => {
      glaciertrailsIcadventreexplrNav.navigate(
        'GlacierTrailsIcadventreexplrdtl',
        {
          glacierId: id,
        },
      );
    },
    [glaciertrailsIcadventreexplrNav],
  );

  const glaciertrailsIcadventreexplrHeader = useMemo(
    () => (
      <View style={styles.glaciertrailsIcadventreexplrHeaderWrap}>
        <Text style={styles.glaciertrailsIcadventreexplrWelcome}>WELCOME</Text>
        <Text style={styles.glaciertrailsIcadventreexplrScreenTitle}>
          Glacier Trails
        </Text>
        <View style={styles.glaciertrailsIcadventreexplrSearchWrap}>
          <Image
            source={require('../../assets/imgs/glaciertrailspsea.png')}
            style={styles.glaciertrailsIcadventreexplrSearchIcon}
          />
          <TextInput
            placeholder="Search glaciers or locations..."
            placeholderTextColor={glaciertrailsIcadventreexplrMuted}
            value={glaciertrailsIcadventreexplrQuery}
            onChangeText={setGlaciertrailsIcadventreexplrQuery}
            style={styles.glaciertrailsIcadventreexplrSearchInp}
            autoCorrect={false}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.glaciertrailsIcadventreexplrFilters}>
          <Pressable
            onPress={() => setGlaciertrailsIcadventreexplrMode('all')}
            style={[
              styles.glaciertrailsIcadventreexplrFilterBtn,
              glaciertrailsIcadventreexplrMode === 'all'
                ? styles.glaciertrailsIcadventreexplrFilterOn
                : styles.glaciertrailsIcadventreexplrFilterOff,
            ]}>
            <Text
              style={[
                styles.glaciertrailsIcadventreexplrFilterTxt,
                glaciertrailsIcadventreexplrMode === 'all' &&
                  styles.glaciertrailsIcadventreexplrFilterTxtOn,
              ]}>
              All Glaciers
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setGlaciertrailsIcadventreexplrMode('saved')}
            style={[
              styles.glaciertrailsIcadventreexplrFilterBtn,
              glaciertrailsIcadventreexplrMode === 'saved'
                ? styles.glaciertrailsIcadventreexplrFilterOnFill
                : styles.glaciertrailsIcadventreexplrFilterOff,
            ]}>
            <Text
              style={[
                styles.glaciertrailsIcadventreexplrFilterTxt,
                glaciertrailsIcadventreexplrMode === 'saved' &&
                  styles.glaciertrailsIcadventreexplrFilterTxtFill,
              ]}>
              Saved ({glaciertrailsIcadventreexplrSaved.savedCount})
            </Text>
          </Pressable>
        </View>
      </View>
    ),
    [
      glaciertrailsIcadventreexplrQuery,
      glaciertrailsIcadventreexplrMode,
      glaciertrailsIcadventreexplrSaved.savedCount,
    ],
  );

  return (
    <GlacierTrailsIcadventrelay>
      <View style={{paddingTop: glaciertrailsIcadventreexplrInsets.top + 8}}>
        <FlatList
          data={glaciertrailsIcadventreexplrFiltered}
          keyExtractor={g => g.id}
          scrollEnabled={false}
          ListHeaderComponent={glaciertrailsIcadventreexplrHeader}
          contentContainerStyle={[
            styles.glaciertrailsIcadventreexplrListContent,
            {paddingBottom: glaciertrailsIcadventreexplrInsets.bottom + 100},
          ]}
          renderItem={({item}) => (
            <GlacierTrailsIcadventreexplrListRow
              item={item}
              onOpen={glaciertrailsIcadventreexplrOpen}
            />
          )}
          extraData={glaciertrailsIcadventreexplrSaved.savedKey}
          ListEmptyComponent={
            <View style={styles.glaciertrailsIcadventreexplrEmpty}>
              <Text style={styles.glaciertrailsIcadventreexplrEmptyIcon}>
                🏔
              </Text>
              <Text style={styles.glaciertrailsIcadventreexplrEmptyTxt}>
                No glaciers found
              </Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
    </GlacierTrailsIcadventrelay>
  );
};

export default GlacierTrailsIcadventreexplr;

const styles = StyleSheet.create({
  glaciertrailsIcadventreexplrRoot: {
    flex: 1,
    backgroundColor: glaciertrailsIcadventreexplrBg,
  },
  glaciertrailsIcadventreexplrListContent: {
    paddingHorizontal: 18,
  },
  glaciertrailsIcadventreexplrHeaderWrap: {
    paddingBottom: 8,
  },
  glaciertrailsIcadventreexplrWelcome: {
    color: '#6BA8C8',
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  glaciertrailsIcadventreexplrScreenTitle: {
    color: glaciertrailsIcadventreexplrTitle,
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 18,
  },
  glaciertrailsIcadventreexplrSearchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: glaciertrailsIcadventreexplrSearchBg,
    borderRadius: 16,
    paddingHorizontal: 14,
    marginBottom: 14,
  },
  glaciertrailsIcadventreexplrSearchIcon: {
    color: glaciertrailsIcadventreexplrMuted,
    fontSize: 18.2,
    marginRight: 8,
  },
  glaciertrailsIcadventreexplrSearchInp: {
    flex: 1,
    color: '#002F6D',
    fontSize: 15.15,
    paddingVertical: 14,
  },
  glaciertrailsIcadventreexplrFilters: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 8.1,
    marginTop: 4,
  },
  glaciertrailsIcadventreexplrFilterBtn: {
    paddingHorizontal: 16,
    paddingVertical: 7.1,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glaciertrailsIcadventreexplrFilterOff: {
    borderWidth: 1,
    borderColor: '#1A3F63',
    backgroundColor: 'transparent',
  },
  glaciertrailsIcadventreexplrFilterOn: {
    borderWidth: 1,
    borderColor: '#4AAAD4',
    backgroundColor: '#0D2B40',
  },
  glaciertrailsIcadventreexplrFilterOnFill: {
    backgroundColor: '#0D2B40',
    borderWidth: 1,
    borderColor: '#4AAAD4',
  },
  glaciertrailsIcadventreexplrFilterTxt: {
    color: glaciertrailsIcadventreexplrMuted,
    fontSize: 13.13,
    fontWeight: '600',
  },
  glaciertrailsIcadventreexplrFilterTxtOn: {
    color: glaciertrailsIcadventreexplrAccent,
  },
  glaciertrailsIcadventreexplrFilterTxtFill: {
    color: '#4AAAD4',
  },
  glaciertrailsIcadventreexplrCardOuter: {
    marginBottom: 16,
  },
  glaciertrailsIcadventreexplrCardPressed: {
    opacity: 0.94,
  },
  glaciertrailsIcadventreexplrCardInner: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: glaciertrailsIcadventreexplrCardBg,
  },
  glaciertrailsIcadventreexplrHero: {
    height: 160.16,
    justifyContent: 'flex-end',
  },
  glaciertrailsIcadventreexplrHeroImg: {
    borderTopLeftRadius: 20.12,
    borderTopRightRadius: 20.12,
  },
  glaciertrailsIcadventreexplrHeroTap: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  glaciertrailsIcadventreexplrHeroTopSpacer: {
    flex: 1,
  },
  glaciertrailsIcadventreexplrHeartBtn: {
    position: 'absolute',
    top: 12.12,
    right: 12,
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#0D2137',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glaciertrailsIcadventreexplrHeartTxt: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  glaciertrailsIcadventreexplrHeartOn: {
    color: '#CC2020',
  },
  glaciertrailsIcadventreexplrTypeBadge: {
    alignSelf: 'flex-start',
    margin: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: '#144881',
    borderWidth: 1,
    borderColor: '#1A3A5C',
    maxWidth: '80%',
  },
  glaciertrailsIcadventreexplrTypeBadgeTxt: {
    color: glaciertrailsIcadventreexplrAccent,
    fontSize: 11,
    fontWeight: '700',
  },
  glaciertrailsIcadventreexplrCardBody: {
    padding: 16,
  },
  glaciertrailsIcadventreexplrNameRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 10,
  },
  glaciertrailsIcadventreexplrName: {
    flex: 1,
    color: glaciertrailsIcadventreexplrTitle,
    fontSize: 17,
    fontWeight: '700',
  },
  glaciertrailsIcadventreexplrStatusPill: {
    maxWidth: '42%',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#144881',
  },
  glaciertrailsIcadventreexplrStatusTxt: {
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
  },
  glaciertrailsIcadventreexplrLocRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  glaciertrailsIcadventreexplrLocIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  glaciertrailsIcadventreexplrLoc: {
    color: glaciertrailsIcadventreexplrMuted,
    fontSize: 12,
  },
  glaciertrailsIcadventreexplrStatsRow: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 8,
  },
  glaciertrailsIcadventreexplrStat: {
    flex: 1,
    backgroundColor: '#144881',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 6,
    alignItems: 'center',
  },
  glaciertrailsIcadventreexplrStatVal: {
    color: glaciertrailsIcadventreexplrAccent,
    fontSize: 13,
    fontWeight: '800',
    textAlign: 'center',
  },
  glaciertrailsIcadventreexplrStatLbl: {
    marginTop: 4,
    color: '#6BA8C8',
    fontSize: 9,
    fontWeight: '400',
    letterSpacing: 0.6,
  },
  glaciertrailsIcadventreexplrEmpty: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  glaciertrailsIcadventreexplrEmptyIcon: {
    fontSize: 42,
    marginBottom: 12,
  },
  glaciertrailsIcadventreexplrEmptyTxt: {
    color: glaciertrailsIcadventreexplrAccent,
    fontSize: 16,
    fontWeight: '600',
  },
});
