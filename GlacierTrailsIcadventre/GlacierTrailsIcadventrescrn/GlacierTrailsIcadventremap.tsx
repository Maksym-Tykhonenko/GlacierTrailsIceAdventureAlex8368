import {
  CommonActions,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {glaciertrailsIcadventreexplrData} from '../GlacierTrailsIcadventredata/glaciertrailsIcadventreexplrindex';
import {recordMapGlacierTap} from './GlacierTrailsIcadventrejornlprogress';
import type {GlacierTrailsIcadventreexplrRow} from '../GlacierTrailsIcadventretypes/glaciertrailsIcadventreexplrtypes';
import GlacierTrailsIcadventrelay from '../GlacierTrailsIcadventrecmp/GlacierTrailsIcadventrelay';
import Orientation from 'react-native-orientation-locker';

const bg = '#144881';
const accent = '#5BB0D9';
const muted = '#7E9AB5';
const titleColor = '#E4F2FA';
const searchBg = '#0C2748';

const pos = '#4EC8D9';
const neg = '#E85A5A';
const neu = '#8E9AAF';

const statLabel = '#6BA8C8';

const chipIds = [
  'perito-moreno-glacier',
  'vatnajokull-glacier',
  'athabasca-glacier',
  'mer-de-glace',
  'franz-josef-glacier',
] as const;

function parseCoordinates(
  raw: string,
): {latitude: number; longitude: number} | null {
  const parts = raw.split(/[,，]\s*/);
  if (parts.length < 2) {
    return null;
  }
  const latitude = parseFloat(parts[0].trim());
  const longitude = parseFloat(parts[1].trim());
  if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
    return null;
  }
  if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
    return null;
  }
  return {latitude, longitude};
}

function toneColor(t: GlacierTrailsIcadventreexplrRow['statusTone']) {
  if (t === 'positive') {
    return pos;
  }
  if (t === 'negative') {
    return neg;
  }
  return neu;
}

function shortChipLabel(name: string) {
  const base = name.replace(/\s+Glacier$/i, '').trim();
  const first = base.split(/[\s-/]/)[0] ?? base;
  return first.length > 12 ? `${first.slice(0, 10)}…` : first;
}

function displayName(name: string) {
  return name.replace(/\s+Glacier$/i, '').trim();
}

type MapPoint = {
  row: GlacierTrailsIcadventreexplrRow;
  latitude: number;
  longitude: number;
};

const GlacierTrailsIcadventremap = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const mapRef = useRef<MapView>(null);
  const [selected, setSelected] =
    useState<GlacierTrailsIcadventreexplrRow | null>(null);

  useFocusEffect(
    useCallback(() => {
      Orientation.lockToPortrait();
      return () => {
        Orientation.unlockAllOrientations();
      };
    }, []),
  );

  const points = useMemo((): MapPoint[] => {
    const out: MapPoint[] = [];
    for (const row of glaciertrailsIcadventreexplrData) {
      const c = parseCoordinates(row.coordinates);
      if (c) {
        out.push({row, latitude: c.latitude, longitude: c.longitude});
      }
    }
    return out;
  }, []);

  const initialRegion = useMemo(() => {
    if (points.length === 0) {
      return {
        latitude: 48,
        longitude: 5,
        latitudeDelta: 32,
        longitudeDelta: 42,
      };
    }
    const lats = points.map(p => p.latitude);
    const lngs = points.map(p => p.longitude);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);
    const midLat = (minLat + maxLat) / 2;
    const midLng = (minLng + maxLng) / 2;
    let latDelta = (maxLat - minLat) * 1.08 || 10;
    let lngDelta = (maxLng - minLng) * 1.08 || 14;
    latDelta = Math.max(latDelta, 3.5);
    lngDelta = Math.max(lngDelta, 5);
    return {
      latitude: midLat,
      longitude: midLng,
      latitudeDelta: latDelta,
      longitudeDelta: lngDelta,
    };
  }, [points]);

  const fitAll = useCallback(() => {
    if (!mapRef.current || points.length === 0) {
      return;
    }
    mapRef.current.fitToCoordinates(
      points.map(p => ({latitude: p.latitude, longitude: p.longitude})),
      {
        edgePadding: {
          top: 36,
          right: 14,
          bottom: selected ? 200 : 56,
          left: 14,
        },
        animated: false,
      },
    );
  }, [points, selected]);

  const focusPoint = useCallback((p: MapPoint) => {
    mapRef.current?.animateToRegion(
      {
        latitude: p.latitude,
        longitude: p.longitude,
        latitudeDelta: 7,
        longitudeDelta: 9,
      },
      0,
    );
  }, []);

  const onSelectRow = useCallback(
    (row: GlacierTrailsIcadventreexplrRow) => {
      void recordMapGlacierTap(row.id);
      setSelected(row);
      const p = points.find(x => x.row.id === row.id);
      if (p) {
        focusPoint(p);
      }
    },
    [points, focusPoint],
  );

  const openDetail = useCallback(
    (id: string) => {
      navigation.dispatch(
        CommonActions.navigate({
          name: 'GlacierTrailsIcadventreexplr',
          params: {
            screen: 'GlacierTrailsIcadventreexplrdtl',
            params: {glacierId: id},
          },
        }),
      );
    },
    [navigation],
  );

  const mapMinHeight = Math.round(Dimensions.get('window').height * 0.62);

  return (
    <GlacierTrailsIcadventrelay>
      <View style={[styles.root, {paddingTop: insets.top + 8}]}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>INTERACTIVE</Text>
          <Text style={styles.title}>Glacier Map</Text>
        </View>

        <View style={[styles.mapWrap, {minHeight: mapMinHeight}]}>
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={initialRegion}
            showsCompass={false}
            provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
            userInterfaceStyle="dark"
            toolbarEnabled={false}
            onMapReady={fitAll}>
            {points.map(p => (
              <Marker
                key={p.row.id}
                coordinate={{latitude: p.latitude, longitude: p.longitude}}
                tracksViewChanges={false}
                onPress={() => onSelectRow(p.row)}
                anchor={{x: 0.5, y: 0.5}}>
                {Platform.OS === 'ios' ? (
                  <View
                    style={[
                      styles.markerDot,
                      selected?.id === p.row.id && styles.markerDotSelected,
                    ]}
                  />
                ) : null}
              </Marker>
            ))}
          </MapView>

          <Pressable
            accessibilityLabel="Recenter map"
            onPress={fitAll}
            style={[
              styles.compassBtn,
              selected ? styles.compassBtnSheet : styles.compassBtnClear,
            ]}>
            <Image
              source={require('../../assets/imgs/glaciertrailscomp.png')}
            />
          </Pressable>

          {selected ? (
            <View style={styles.card}>
              <View style={styles.cardTop}>
                <View style={styles.cardTitleBlock}>
                  <Text style={styles.cardName} numberOfLines={1}>
                    {displayName(selected.name)}
                  </Text>
                  <Text style={styles.cardLoc} numberOfLines={1}>
                    {selected.location}
                  </Text>
                </View>
                <View style={styles.cardTopRight}>
                  <View
                    style={[
                      styles.statusPill,
                      {borderColor: toneColor(selected.statusTone)},
                    ]}>
                    <Text
                      style={[
                        styles.statusTxt,
                        {color: toneColor(selected.statusTone)},
                      ]}
                      numberOfLines={2}>
                      {selected.status}
                    </Text>
                  </View>
                  <Pressable
                    hitSlop={10}
                    onPress={() => setSelected(null)}
                    style={styles.closeBtn}>
                    <Text style={styles.closeTxt}>✕</Text>
                  </Pressable>
                </View>
              </View>

              <View style={styles.statsRow}>
                <View style={styles.stat}>
                  <Text style={styles.statVal}>{selected.area}</Text>
                  <Text style={styles.statLbl}>AREA</Text>
                </View>
                <View style={styles.stat}>
                  <Text style={styles.statVal}>{selected.elevation}</Text>
                  <Text style={styles.statLbl}>ELEVATION</Text>
                </View>
                <View style={styles.stat}>
                  <Text style={styles.statVal}>{selected.temp}</Text>
                  <Text style={styles.statLbl}>TEMP</Text>
                </View>
              </View>

              <Pressable
                onPress={() => openDetail(selected.id)}
                style={({pressed}) => [styles.cta, pressed && {opacity: 0.92}]}>
                <Text style={styles.ctaTxt}>View Full Details</Text>
                <Text style={styles.ctaArrow}> →</Text>
              </Pressable>
            </View>
          ) : null}
        </View>

        <Text style={styles.hint}>Tap a glacier marker to see details</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsContent}
          style={styles.chipsScroll}>
          {chipIds.map(id => {
            const row = glaciertrailsIcadventreexplrData.find(g => g.id === id);
            if (!row) {
              return null;
            }
            const active = selected?.id === id;
            return (
              <Pressable
                key={id}
                onPress={() => onSelectRow(row)}
                style={[styles.chip, active ? styles.chipOn : styles.chipOff]}>
                <Text style={[styles.chipTxt, active && styles.chipTxtOn]}>
                  {shortChipLabel(row.name)}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={[styles.bottomSpacer, {height: insets.bottom + 8}]} />
      </View>
    </GlacierTrailsIcadventrelay>
  );
};

export default GlacierTrailsIcadventremap;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: bg,
  },
  header: {
    paddingHorizontal: 18,
    marginBottom: 12.143,
  },
  eyebrow: {
    color: '#6BA8C8',
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 1.2,
    marginBottom: 6.48,
  },
  title: {
    color: titleColor,
    fontSize: 22.44,
    fontWeight: '700',
  },
  mapWrap: {
    marginHorizontal: 18,
    borderRadius: 20.12,
    overflow: 'hidden',
    backgroundColor: searchBg,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerDot: {
    width: 16.16,
    height: 16.16,
    borderRadius: 8.08,
    backgroundColor: accent,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  markerDotSelected: {
    width: 22.22,
    height: 22.22,
    borderRadius: 11.11,
    borderWidth: 3,
  },
  compassBtn: {
    position: 'absolute',
    right: 12.12,
    width: 40,
    height: 40.4,
    borderRadius: 22,
    backgroundColor: '#061220',
    alignItems: 'center',
    justifyContent: 'center',
  },
  compassBtnClear: {
    bottom: 16.161,
  },
  compassBtnSheet: {
    bottom: 200,
  },
  compassTxt: {
    color: accent,
    fontSize: 20,
    fontWeight: '700',
  },
  card: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
    borderRadius: 18,
    padding: 16,
    backgroundColor: '#002F6D',
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 10,
  },
  cardTitleBlock: {
    flex: 1,
  },
  cardName: {
    color: titleColor,
    fontSize: 17,
    fontWeight: '700',
  },
  cardLoc: {
    marginTop: 6,
    color: muted,
    fontSize: 13,
  },
  cardTopRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusPill: {
    maxWidth: 110,
    paddingHorizontal: 4,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#002F6D',
  },
  statusTxt: {
    fontSize: 10,
    fontWeight: '500',
    textAlign: 'center',
  },
  closeBtn: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: '#144881',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeTxt: {
    color: accent,
    fontSize: 13,
    fontWeight: '700',
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 14,
    gap: 8,
  },
  stat: {
    flex: 1,
    backgroundColor: bg,
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 6,
    alignItems: 'center',
  },
  statVal: {
    color: '#4AAAD4',
    fontSize: 13,
    fontWeight: '800',
    textAlign: 'center',
  },
  statLbl: {
    marginTop: 4,
    color: statLabel,
    fontSize: 9,
    fontWeight: '400',
    letterSpacing: 0.6,
  },
  cta: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4AAAD4',
    borderRadius: 12,
    height: 43,
  },
  ctaTxt: {
    color: '#061220',
    fontSize: 14,
    fontWeight: '700',
  },
  ctaArrow: {
    color: '#061220',
    fontSize: 14,
    fontWeight: '700',
  },
  hint: {
    textAlign: 'center',
    color: '#061220',
    fontSize: 13,
    marginTop: 24,
    marginBottom: 2,
    paddingHorizontal: 24,
  },
  chipsScroll: {
    marginBottom: 8,
  },
  chipsContent: {
    paddingHorizontal: 18,
    gap: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexWrap: 'wrap',
    marginTop: 6,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 12,
  },
  chipOff: {
    borderWidth: 1,
    borderColor: '#1A3F63',
    backgroundColor: '#0D2137',
  },
  chipOn: {
    borderWidth: 1,
    borderColor: '#4AAAD4',
    backgroundColor: '#0D2B40',
  },
  chipTxt: {
    color: '#6BA8C8',
    fontSize: 11,
    fontWeight: '500',
  },
  chipTxtOn: {
    color: accent,
  },
  bottomSpacer: {
    width: '100%',
  },
});
