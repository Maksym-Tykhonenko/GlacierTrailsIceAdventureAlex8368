import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import GlacierTrailsIcadventreexplrstk from './GlacierTrailsIcadventre/GlacierTrailsIcadventrenav/GlacierTrailsIcadventreexplrstk.tsx';
import GlacierTrailsIcadventremap from './GlacierTrailsIcadventre/GlacierTrailsIcadventrescrn/GlacierTrailsIcadventremap';
import GlacierTrailsIcadventrejornlstk from './GlacierTrailsIcadventre/GlacierTrailsIcadventrenav/GlacierTrailsIcadventrejornlstk.tsx';
import GlacierTrailsIcadventrecalclstk from './GlacierTrailsIcadventre/GlacierTrailsIcadventrenav/GlacierTrailsIcadventrecalclstk.tsx';
import GlacierTrailsIcadventrenvgtr from './GlacierTrailsIcadventre/GlacierTrailsIcadventrescrn/GlacierTrailsIcadventrenvgtr';

const Tab = createBottomTabNavigator();

const glaciertrailsIcadventretabBg = '#050D18';

const glaciertrailsIcadventretabActive = '#5BB0D9';
const glaciertrailsIcadventretabIdle = '#6B7C8E';

type GlacierTrailsIcadventretabItemProps = {
  label: string;
  focused: boolean;
  source: ImageSourcePropType;
};

const GlacierTrailsIcadventretabItem = ({
  label,
  focused,
  source,
}: GlacierTrailsIcadventretabItemProps) => {
  const glaciertrailsIcadventretabColor = focused
    ? glaciertrailsIcadventretabActive
    : glaciertrailsIcadventretabIdle;
  return (
    <View style={styles.glaciertrailsIcadventretabItem}>
      <View style={styles.glaciertrailsIcadventretabIconImageWrap}>
        <Image
          source={source}
          style={styles.glaciertrailsIcadventretabIconImg}
          resizeMode="contain"
          tintColor={glaciertrailsIcadventretabColor}
        />
      </View>
      <Text
        style={[
          styles.glaciertrailsIcadventretabLabel,
          {color: glaciertrailsIcadventretabColor},
        ]}
        numberOfLines={1}>
        {label}
      </Text>
      <View style={styles.glaciertrailsIcadventretabDotRow}>
        {focused ? (
          <View style={styles.glaciertrailsIcadventretabDot} />
        ) : (
          <View style={styles.glaciertrailsIcadventretabDotGhost} />
        )}
      </View>
    </View>
  );
};

const GlacierTrailsIcadventretabTabIconExplore = ({
  focused,
}: {
  focused: boolean;
}) => (
  <GlacierTrailsIcadventretabItem
    label="EXPLORE"
    focused={focused}
    source={require('./assets/imgs/glaciertrailsIcadventretab1.png')}
  />
);

const GlacierTrailsIcadventretabTabIconMap = ({
  focused,
}: {
  focused: boolean;
}) => (
  <GlacierTrailsIcadventretabItem
    label="MAP"
    focused={focused}
    source={require('./assets/imgs/glaciertrailsIcadventretab2.png')}
  />
);

const GlacierTrailsIcadventretabTabIconJournal = ({
  focused,
}: {
  focused: boolean;
}) => (
  <GlacierTrailsIcadventretabItem
    label="JOURNAL"
    focused={focused}
    source={require('./assets/imgs/glaciertrailsIcadventretab3.png')}
  />
);

const GlacierTrailsIcadventretabTabIconCalc = ({
  focused,
}: {
  focused: boolean;
}) => (
  <GlacierTrailsIcadventretabItem
    label="CALC"
    focused={focused}
    source={require('./assets/imgs/glaciertrailsIcadventretab4.png')}
  />
);

const GlacierTrailsIcadventretabTabIconGame = ({
  focused,
}: {
  focused: boolean;
}) => (
  <GlacierTrailsIcadventretabItem
    label="GAME"
    focused={focused}
    source={require('./assets/imgs/glaciertrailsIcadventretab5.png')}
  />
);

const GlacierTrailsIcadventretabBarBg = () => (
  <View pointerEvents="none" style={styles.glaciertrailsIcadventretabBarFill} />
);

const GlacierTrailsIcadventretab = () => {
  const glaciertrailsIcadventretabInsets = useSafeAreaInsets();
  const glaciertrailsIcadventretabBarH =
    58 + Math.max(glaciertrailsIcadventretabInsets.bottom, 10);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: glaciertrailsIcadventretabActive,
        tabBarInactiveTintColor: glaciertrailsIcadventretabIdle,
        tabBarStyle: [
          styles.glaciertrailsIcadventretabBar,
          {
            height: glaciertrailsIcadventretabBarH,
            paddingBottom: Math.max(
              glaciertrailsIcadventretabInsets.bottom,
              10,
            ),
          },
        ],
        tabBarBackground: GlacierTrailsIcadventretabBarBg,
      }}>
      <Tab.Screen
        name="GlacierTrailsIcadventreexplr"
        component={GlacierTrailsIcadventreexplrstk}
        options={({route}) => {
          const glaciertrailsIcadventreexplrRouteName =
            getFocusedRouteNameFromRoute(route) ??
            'GlacierTrailsIcadventreexplrHome';
          const glaciertrailsIcadventreexplrHideTab =
            glaciertrailsIcadventreexplrRouteName ===
            'GlacierTrailsIcadventreexplrdtl';
          return {
            tabBarIcon: GlacierTrailsIcadventretabTabIconExplore,
            tabBarStyle: glaciertrailsIcadventreexplrHideTab
              ? {display: 'none', height: 0}
              : [
                  styles.glaciertrailsIcadventretabBar,
                  {
                    height: glaciertrailsIcadventretabBarH,
                    paddingBottom: Math.max(
                      glaciertrailsIcadventretabInsets.bottom,
                      10,
                    ),
                  },
                ],
          };
        }}
      />
      <Tab.Screen
        name="GlacierTrailsIcadventremap"
        component={GlacierTrailsIcadventremap}
        options={{
          tabBarIcon: GlacierTrailsIcadventretabTabIconMap,
        }}
      />
      <Tab.Screen
        name="GlacierTrailsIcadventrejornl"
        component={GlacierTrailsIcadventrejornlstk}
        options={({route}) => {
          const jRoute =
            getFocusedRouteNameFromRoute(route) ??
            'GlacierTrailsIcadventrejornlHome';
          const jHide = jRoute === 'GlacierTrailsIcadventrejornldtl';
          return {
            tabBarIcon: GlacierTrailsIcadventretabTabIconJournal,
            tabBarStyle: jHide
              ? {display: 'none', height: 0}
              : [
                  styles.glaciertrailsIcadventretabBar,
                  {
                    height: glaciertrailsIcadventretabBarH,
                    paddingBottom: Math.max(
                      glaciertrailsIcadventretabInsets.bottom,
                      10,
                    ),
                  },
                ],
          };
        }}
      />
      <Tab.Screen
        name="GlacierTrailsIcadventrecalcl"
        component={GlacierTrailsIcadventrecalclstk}
        options={({route}) => {
          const calcRoute =
            getFocusedRouteNameFromRoute(route) ??
            'GlacierTrailsIcadventrecalclHome';
          const calcHideTab = calcRoute !== 'GlacierTrailsIcadventrecalclHome';
          return {
            tabBarIcon: GlacierTrailsIcadventretabTabIconCalc,
            tabBarStyle: calcHideTab
              ? {display: 'none', height: 0}
              : [
                  styles.glaciertrailsIcadventretabBar,
                  {
                    height: glaciertrailsIcadventretabBarH,
                    paddingBottom: Math.max(
                      glaciertrailsIcadventretabInsets.bottom,
                      10,
                    ),
                  },
                ],
          };
        }}
      />
      <Tab.Screen
        name="GlacierTrailsIcadventrenvgtr"
        component={GlacierTrailsIcadventrenvgtr}
        options={({route}) => {
          const gameRoute =
            getFocusedRouteNameFromRoute(route) ??
            'GlacierTrailsIcadventrenvgtrMenu';
          const gameHideTab = gameRoute !== 'GlacierTrailsIcadventrenvgtrMenu';
          return {
            tabBarIcon: GlacierTrailsIcadventretabTabIconGame,
            tabBarStyle: gameHideTab
              ? {display: 'none', height: 0}
              : [
                  styles.glaciertrailsIcadventretabBar,
                  {
                    height: glaciertrailsIcadventretabBarH,
                    paddingBottom: Math.max(
                      glaciertrailsIcadventretabInsets.bottom,
                      10,
                    ),
                  },
                ],
          };
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  glaciertrailsIcadventretabIconImageWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 54,
    height: 28,
  },
  glaciertrailsIcadventretabBar: {
    elevation: 0,
    paddingTop: 18.12,
    paddingHorizontal: 4.4,
    borderTopWidth: 1,
    borderColor: '#1A3A5C',
    borderTopColor: '#1A3A5C',
    backgroundColor: glaciertrailsIcadventretabBg,
  },
  glaciertrailsIcadventretabBarFill: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: glaciertrailsIcadventretabBg,
  },

  glaciertrailsIcadventretabItem: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    minWidth: 56,
    paddingTop: 2,
  },
  glaciertrailsIcadventretabLabel: {
    marginTop: 6,
    fontSize: 9.9,
    fontWeight: '500',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  glaciertrailsIcadventretabDotRow: {
    marginTop: 4.4,
    height: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glaciertrailsIcadventretabDot: {
    width: 5.5,
    height: 5.5,
    borderRadius: 2.5,
    backgroundColor: glaciertrailsIcadventretabActive,
  },
  glaciertrailsIcadventretabDotGhost: {
    width: 5.5,
    height: 5.4,
    borderRadius: 2.5,
    opacity: 0,
  },
});

export default GlacierTrailsIcadventretab;
