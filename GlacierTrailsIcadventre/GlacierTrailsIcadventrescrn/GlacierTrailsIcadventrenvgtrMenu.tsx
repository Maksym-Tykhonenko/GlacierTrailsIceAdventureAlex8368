import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import type {GlacierTrailsIcadventrenvgtrStackParamList} from '../GlacierTrailsIcadventretypes/glaciertrailsIcadventrenvgtrnavtypes';
import GlacierTrailsIcadventrelay from '../GlacierTrailsIcadventrecmp/GlacierTrailsIcadventrelay';

const titleC = '#E4F2FA';

type Nav = StackNavigationProp<
  GlacierTrailsIcadventrenvgtrStackParamList,
  'GlacierTrailsIcadventrenvgtrMenu'
>;

const GlacierTrailsIcadventrenvgtrMenu = () => {
  const insets = useSafeAreaInsets();
  const nav = useNavigation<Nav>();

  return (
    <GlacierTrailsIcadventrelay wudlanndvildexplorrlayScroll={false}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 100,
        }}>
        <Image
          source={require('../../assets/imgs/glaciertrailsnvgintr.png')}
          style={styles.hero}
          resizeMode="cover"
        />
        <View style={[styles.body, {paddingHorizontal: 18}]}>
          <Text style={styles.title}>Ice Navigator</Text>
          <Text style={styles.desc}>
            Captain your vessel through treacherous arctic waters. Dodge
            icebergs and collect ice crystals to score points.
          </Text>
          <View style={styles.cards}>
            <View style={styles.mini}>
              <Text style={styles.miniIcon}>🕹️</Text>
              <Text style={styles.miniTxt}>Use ← → buttons</Text>
            </View>
            <View style={styles.mini}>
              <Text style={styles.miniIcon}>🧊</Text>
              <Text style={styles.miniTxt}>Avoid icebergs</Text>
            </View>
            <View style={styles.mini}>
              <Text style={styles.miniIcon}>⭐</Text>
              <Text style={styles.miniTxt}>Collect stars</Text>
            </View>
          </View>
          <Pressable
            onPress={() => nav.navigate('GlacierTrailsIcadventrenvgtrRun')}
            style={({pressed}) => [styles.start, pressed && {opacity: 0.92}]}>
            <Text style={styles.startTxt}>START EXPEDITION</Text>
          </Pressable>
        </View>
      </ScrollView>
    </GlacierTrailsIcadventrelay>
  );
};

export default GlacierTrailsIcadventrenvgtrMenu;

const styles = StyleSheet.create({
  hero: {
    width: '100%',
  },
  body: {
    paddingTop: 20,
  },
  title: {
    color: titleC,
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 12,
  },
  desc: {
    color: '#6BA8C8',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 22,
    paddingHorizontal: 20,
  },
  cards: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 28,
    width: '88%',
    alignSelf: 'center',
  },
  mini: {
    flex: 1,
    backgroundColor: '#002F6D',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
    minHeight: 90,
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: '#1A3A5C',
  },
  miniIcon: {
    fontSize: 28,
    marginBottom: 8.1,
  },
  miniTxt: {
    color: '#6BA8C8',
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 15.15,
  },
  start: {
    backgroundColor: '#4AAAD4',
    borderRadius: 18,
    height: 60.43,
    alignItems: 'center',
    justifyContent: 'center',
    width: '93%',
    alignSelf: 'center',
  },
  startTxt: {
    color: '#061220',
    fontSize: 18.41,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
