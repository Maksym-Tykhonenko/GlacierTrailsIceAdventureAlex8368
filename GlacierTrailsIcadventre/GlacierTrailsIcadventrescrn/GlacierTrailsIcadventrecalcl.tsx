import {useFocusEffect, useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import type {GlacierTrailsIcadventrecalclStackParamList} from '../GlacierTrailsIcadventretypes/glaciertrailsIcadventrecalclnavtypes';
import GlacierTrailsIcadventrelay from '../GlacierTrailsIcadventrecmp/GlacierTrailsIcadventrelay';
import {countSavedCalcs} from './GlacierTrailsIcadventrecalclstore';

const bg = '#144881';
const accent = '#5BB0D9';
const muted = '#7E9AB5';
const titleC = '#E4F2FA';

const eyebrow = '#6BA8C8';

type Nav = StackNavigationProp<
  GlacierTrailsIcadventrecalclStackParamList,
  'GlacierTrailsIcadventrecalclHome'
>;

const menu = [
  {
    id: 'melt' as const,
    emoji: '💧',
    accent: '#5BB0D9',
    title: 'Glacier Melt Calculator',
    desc: 'Estimate annual ice melt volume',
  },
  {
    id: 'retreat' as const,
    emoji: '🔄',
    accent: '#4EC8D9',
    title: 'Glacier Retreat Calculator',
    desc: 'Project future glacier length',
  },
  {
    id: 'mass' as const,
    emoji: '⚖️',
    accent: '#E8A84A',
    title: 'Ice Mass Loss Calculator',
    desc: 'Calculate total mass reduction',
  },
  {
    id: 'life' as const,
    emoji: '⏳',
    accent: '#E85A5A',
    title: 'Glacier Lifetime Estimate',
    desc: 'Predict years until disappearance',
  },
];

const GlacierTrailsIcadventrecalcl = () => {
  const insets = useSafeAreaInsets();
  const nav = useNavigation<Nav>();
  const [savedN, setSavedN] = useState(0);

  useFocusEffect(
    useCallback(() => {
      countSavedCalcs().then(setSavedN);
    }, []),
  );

  return (
    <GlacierTrailsIcadventrelay wudlanndvildexplorrlayScroll={false}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: insets.top + 8,
            paddingBottom: insets.bottom + 100,
          },
        ]}>
        <View style={styles.topRow}>
          <View style={styles.topLeft}>
            <Text style={styles.eyebrow}>SCIENTIFIC</Text>
            <Text style={styles.h1}>Calculators</Text>
          </View>
          <Pressable
            onPress={() => nav.navigate('GlacierTrailsIcadventrecalclSaved')}
            style={({pressed}) => [styles.savedBtn, pressed && {opacity: 0.9}]}>
            <Image source={require('../../assets/imgs/glaciertrailssvd.png')} />
            <Text style={styles.savedTxt}>Saved ({savedN})</Text>
          </Pressable>
        </View>
        <Text style={styles.sub}>
          Select a calculator to analyze glacier data with scientific precision.
        </Text>

        {menu.map(item => (
          <Pressable
            key={item.id}
            onPress={() =>
              nav.navigate('GlacierTrailsIcadventrecalclTool', {
                calculator: item.id,
              })
            }
            style={({pressed}) => [styles.card, pressed && {opacity: 0.94}]}>
            <View style={[styles.iconBox, {borderColor: item.accent}]}>
              <Text style={styles.emoji}>{item.emoji}</Text>
            </View>
            <View style={styles.cardMid}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDesc}>{item.desc}</Text>
            </View>
            <View style={[styles.goBtn, {borderColor: item.accent}]}>
              <Image
                source={require('../../assets/imgs/glaciertrailsnvlarr.png')}
                style={[styles.goChev, {tintColor: item.accent}]}
              />
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </GlacierTrailsIcadventrelay>
  );
};

export default GlacierTrailsIcadventrecalcl;

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 18,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 10.1,
  },
  topLeft: {
    flex: 1,
  },
  eyebrow: {
    color: eyebrow,
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  h1: {
    color: titleC,
    fontSize: 22.44,
    fontWeight: '700',
  },
  savedBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8.1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#4AAAD4',
    backgroundColor: '#0D2137',
  },
  savedIcon: {
    fontSize: 14.41,
  },
  savedTxt: {
    color: accent,
    fontSize: 12.12,
    fontWeight: '700',
  },
  sub: {
    color: '#6BA8C8',
    fontSize: 13.13,
    lineHeight: 20,
    marginBottom: 18,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#002F6D',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: '#1A3A5C',
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: bg,
  },
  emoji: {
    fontSize: 26,
  },
  cardMid: {
    flex: 1,
    minWidth: 0,
  },
  cardTitle: {
    color: titleC,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardDesc: {
    color: muted,
    fontSize: 13,
    lineHeight: 18,
  },
  goBtn: {
    width: 32,
    height: 32,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0D2137',
  },
  goChev: {
    left: 1,
  },
});
