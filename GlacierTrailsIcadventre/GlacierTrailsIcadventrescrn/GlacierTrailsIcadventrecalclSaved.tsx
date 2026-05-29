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
import {
  loadSavedCalcs,
  removeSavedCalc,
  type GlacierTrailsIcadventrecalclSavedRow,
} from './GlacierTrailsIcadventrecalclstore';

const bg = '#144881';
const accent = '#5BB0D9';
const muted = '#7E9AB5';
const titleC = '#E4F2FA';
const card = '#082A4A';

type Nav = StackNavigationProp<
  GlacierTrailsIcadventrecalclStackParamList,
  'GlacierTrailsIcadventrecalclSaved'
>;

function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

const GlacierTrailsIcadventrecalclSaved = () => {
  const insets = useSafeAreaInsets();
  const nav = useNavigation<Nav>();
  const [rows, setRows] = useState<GlacierTrailsIcadventrecalclSavedRow[]>([]);

  const load = useCallback(() => {
    void loadSavedCalcs().then(setRows);
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  return (
    <GlacierTrailsIcadventrelay wudlanndvildexplorrlayScroll={false}>
      <View style={[styles.root, {paddingTop: insets.top + 8}]}>
        <View style={styles.header}>
          <Pressable
            onPress={() => nav.goBack()}
            style={styles.backBtn}
            hitSlop={10}>
            <Image
              source={require('../../assets/imgs/glaciertrailsback.png')}
              style={styles.backImg}
              resizeMode="contain"
            />
          </Pressable>
          <Text style={styles.headerTitle}>Saved Calculations</Text>
          <View style={styles.backGhost} />
        </View>
        <View style={styles.divider} />

        {rows.length === 0 ? (
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyIcon}>📊</Text>
            <Text style={styles.emptyTitle}>No saved calculations yet</Text>
            <Text style={styles.emptySub}>
              Run a calculator and save the result
            </Text>
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 18,
              paddingBottom: insets.bottom + 24,
            }}>
            {rows.map(r => (
              <View key={r.id} style={styles.rowCard}>
                <View style={styles.rowTop}>
                  <Text style={styles.rowTitle}>{r.title}</Text>
                  <Pressable
                    hitSlop={8}
                    onPress={() => {
                      void removeSavedCalc(r.id).then(load);
                    }}>
                    <Text style={styles.del}>Remove</Text>
                  </Pressable>
                </View>
                <Text style={styles.rowSum}>{r.summary}</Text>
                <Text style={styles.rowDet} numberOfLines={4}>
                  {r.detail}
                </Text>
                <Text style={styles.rowDate}>{formatDate(r.savedAt)}</Text>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </GlacierTrailsIcadventrelay>
  );
};

export default GlacierTrailsIcadventrecalclSaved;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: bg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingBottom: 10,
  },
  backBtn: {
    width: 40.4,
    height: 40.4,
    borderRadius: 12,
    backgroundColor: '#061220',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backImg: {
    width: 20.2,
    height: 20.2,
  },
  backGhost: {
    width: 40.4,
    height: 40.4,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: titleC,
    fontSize: 17,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#0C2748',
    marginHorizontal: 18,
    marginBottom: 8,
  },
  emptyWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingTop: 48,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    color: titleC,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySub: {
    color: muted,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
  rowCard: {
    backgroundColor: card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  rowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 8,
  },
  rowTitle: {
    flex: 1,
    color: titleC,
    fontSize: 16,
    fontWeight: '700',
  },
  del: {
    color: '#E85A5A',
    fontSize: 13,
    fontWeight: '700',
  },
  rowSum: {
    color: accent,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  rowDet: {
    color: muted,
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 10,
  },
  rowDate: {
    color: muted,
    fontSize: 11,
    fontWeight: '500',
  },
});
