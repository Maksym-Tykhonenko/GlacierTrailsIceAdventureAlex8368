import {useFocusEffect, useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {glaciertrailsIcadventrejornlData} from '../GlacierTrailsIcadventredata/glaciertrailsIcadventrejornlindex';
import type {GlacierTrailsIcadventrejornlStackParamList} from '../GlacierTrailsIcadventretypes/glaciertrailsIcadventrejornlnavtypes';
import GlacierTrailsIcadventrelay from '../GlacierTrailsIcadventrecmp/GlacierTrailsIcadventrelay';
import {
  loadJournalProgress,
  subscribeJournalProgress,
  toggleChallengeManualDone,
} from './GlacierTrailsIcadventrejornlprogress';

const bg = '#144881';
const accent = '#5BB0D9';
const muted = '#7E9AB5';
const titleC = '#E4F2FA';

const eyebrowC = '#6BA8C8';

type Nav = StackNavigationProp<
  GlacierTrailsIcadventrejornlStackParamList,
  'GlacierTrailsIcadventrejornlHome'
>;

type Prog = {
  manualChallengeIds: string[];
};

type ChallengeDef = {
  id: string;
  title: string;
  subtitle: string;
  points: number;
};

const challenges: ChallengeDef[] = [
  {
    id: 'c1',
    title: 'Find a Glacier on Another Continent',
    subtitle:
      'Find one glacier located outside your continent and learn where it is, what country or region it belongs to, and why it is known.',
    points: 20,
  },
  {
    id: 'c2',
    title: 'Compare Two Glacier Types',
    subtitle:
      'Choose two glacier types, such as valley glacier and ice cap, and write down one main difference between them.',
    points: 25,
  },
  {
    id: 'c3',
    title: 'Track a Glacier on the Map',
    subtitle:
      'Find the location of any famous glacier on a world map and identify the nearest country, mountain range, ocean, or lake.',
    points: 15,
  },
  {
    id: 'c4',
    title: 'Learn One Ice Word',
    subtitle:
      'Choose one glacier-related term, such as moraine, crevasse, calving, firn, or terminus, and explain it in your own words.',
    points: 10,
  },
  {
    id: 'c5',
    title: 'Discover a Glacier Fact',
    subtitle:
      'Find one surprising fact about glaciers and save it as a short note.',
    points: 15,
  },
  {
    id: 'c6',
    title: 'Study an Iceberg Route',
    subtitle:
      'Learn how icebergs move after breaking from glaciers or ice shelves. Think about how ocean currents and wind may affect their path.',
    points: 20,
  },
  {
    id: 'c7',
    title: 'Compare Glacier Sizes',
    subtitle:
      'Choose two glaciers and compare their approximate area, length, or location. Decide which one is larger and by how much.',
    points: 25,
  },
  {
    id: 'c8',
    title: 'Find a Glacier Lake',
    subtitle:
      'Search for a lake formed near or by a glacier. Learn its name, location, and why glacial lakes can be important.',
    points: 20,
  },
  {
    id: 'c9',
    title: 'Explore a Polar Region',
    subtitle:
      'Choose either Antarctica, Greenland, Alaska, Patagonia, or the Himalayas and learn why glaciers are important there.',
    points: 30,
  },
  {
    id: 'c10',
    title: 'Understand Glacier Retreat',
    subtitle:
      'Find out what glacier retreat means and write one reason why a glacier may become smaller over time.',
    points: 25,
  },
  {
    id: 'c11',
    title: 'Spot Glacier Evidence in a Landscape',
    subtitle:
      'Learn about one sign that a glacier once shaped a landscape, such as a U-shaped valley, fjord, moraine, or polished rock.',
    points: 20,
  },
  {
    id: 'c12',
    title: 'Research a Famous Glacier Explorer',
    subtitle:
      'Find one historical explorer, scientist, or expedition connected with polar or glacier research and write what they are remembered for.',
    points: 30,
  },
  {
    id: 'c13',
    title: 'Learn About Blue Ice',
    subtitle:
      'Find out why glacier ice can appear blue and explain the idea in one short sentence.',
    points: 15,
  },
  {
    id: 'c14',
    title: 'Create a Mini Glacier Glossary',
    subtitle:
      'Choose five glacier-related words and write a simple definition for each one.',
    points: 35,
  },
  {
    id: 'c15',
    title: 'Find a Dangerous Glacier Feature',
    subtitle:
      'Research one glacier hazard, such as crevasses, calving, icefalls, or glacial lake floods, and explain why it can be dangerous.',
    points: 20,
  },
  {
    id: 'c16',
    title: 'Compare Snow and Glacier Ice',
    subtitle:
      'Learn how snow turns into glacier ice and describe the process in three simple steps.',
    points: 20,
  },
  {
    id: 'c17',
    title: 'Study a Tidewater Glacier',
    subtitle:
      'Find one glacier that reaches the sea and learn why calving and icebergs are common in that environment.',
    points: 25,
  },
  {
    id: 'c18',
    title: 'Look for Glacier Colors',
    subtitle:
      'Find examples of glacier ice that looks blue, white, grey, or black, and learn what can cause these different colors.',
    points: 15,
  },
  {
    id: 'c19',
    title: 'Investigate Freshwater Storage',
    subtitle:
      'Learn why glaciers are important freshwater reservoirs and name one region where glacier meltwater supports rivers.',
    points: 30,
  },
  {
    id: 'c20',
    title: 'Build a Frozen Landscape Timeline',
    subtitle:
      'Choose one glacier and create a simple timeline with three moments: formation, famous observation or discovery, and modern change.',
    points: 40,
  },
];

function tagBorder(tag: string) {
  const palette = ['#5BB0D9', '#4EC8D9', '#6BA8C8', '#7E9AB5'];
  let h = 0;
  for (let i = 0; i < tag.length; i += 1) {
    h += tag.charCodeAt(i);
  }
  return palette[h % palette.length];
}

function preview(body: string) {
  const one = body.replace(/\s+/g, ' ').trim();
  return one.length > 118 ? `${one.slice(0, 115)}…` : one;
}

function factArticleIndex() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now.getTime() - start.getTime()) / 86400000);
  return dayOfYear % glaciertrailsIcadventrejornlData.length;
}

const GlacierTrailsIcadventrejornl = () => {
  const insets = useSafeAreaInsets();
  const nav = useNavigation<Nav>();
  const [tab, setTab] = useState<'articles' | 'challenges'>('articles');
  const [prog, setProg] = useState<Prog>({manualChallengeIds: []});

  const refresh = useCallback(() => {
    void loadJournalProgress().then(p =>
      setProg({manualChallengeIds: p.manualChallengeIds}),
    );
  }, []);

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh]),
  );

  useEffect(() => {
    return subscribeJournalProgress(refresh);
  }, [refresh]);

  const completedMask = useMemo(
    () => challenges.map(c => prog.manualChallengeIds.includes(c.id)),
    [prog],
  );
  const completedCount = completedMask.filter(Boolean).length;
  const totalPoints = challenges.reduce(
    (sum, c, i) => sum + (completedMask[i] ? c.points : 0),
    0,
  );
  const progressPct = Math.round((completedCount / challenges.length) * 100);

  const fact = glaciertrailsIcadventrejornlData[factArticleIndex()];
  const factDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const openArticle = useCallback(
    (id: string) => {
      nav.navigate('GlacierTrailsIcadventrejornldtl', {articleId: id});
    },
    [nav],
  );

  const onToggleChallenge = useCallback((challengeId: string) => {
    void toggleChallengeManualDone(challengeId);
  }, []);

  return (
    <GlacierTrailsIcadventrelay wudlanndvildexplorrlayScroll={false}>
      <View style={[styles.root, {paddingTop: insets.top + 8}]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: insets.bottom + 100,
            paddingHorizontal: 18,
          }}>
          <Text style={styles.eyebrow}>KNOWLEDGE</Text>
          <Text style={styles.screenTitle}>Explorer's Journal</Text>

          <View style={styles.segment}>
            <Pressable
              onPress={() => setTab('articles')}
              style={[styles.segBtn, tab === 'articles' && styles.segOn]}>
              <Text
                style={[styles.segTxt, tab === 'articles' && styles.segTxtOn]}>
                Articles
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setTab('challenges')}
              style={[styles.segBtn, tab === 'challenges' && styles.segOn]}>
              <Text
                style={[
                  styles.segTxt,
                  tab === 'challenges' && styles.segTxtOn,
                ]}>
                Challenges ({completedCount}/{challenges.length})
              </Text>
            </Pressable>
          </View>

          {tab === 'articles' ? (
            <>
              <View style={styles.factCard}>
                <View style={styles.factTop}>
                  <View style={styles.factIcon}>
                    <Text style={styles.factIconTxt}>💡</Text>
                  </View>
                  <View style={styles.factHeadTxt}>
                    <Text style={styles.factLabel}>FACT OF THE DAY</Text>
                    <Text style={styles.factDate}>{factDate}</Text>
                  </View>
                </View>
                <Text style={styles.factBody}>
                  Many fjords were carved by glaciers during past ice ages. As
                  the ice retreated and sea levels changed, ocean water filled
                  the deep valleys left behind.
                </Text>
              </View>

              {glaciertrailsIcadventrejornlData.map(a => (
                <Pressable
                  key={a.id}
                  onPress={() => openArticle(a.id)}
                  style={({pressed}) => [
                    styles.articleCard,
                    pressed && {opacity: 0.94},
                  ]}>
                  <View style={styles.articleTop}>
                    <View
                      style={[styles.tagPill, {borderColor: tagBorder(a.tag)}]}>
                      <Text style={styles.tagPillTxt}>{a.tag}</Text>
                    </View>
                    <Image
                      source={require('../../assets/imgs/glaciertrailsnvnxt.png')}
                      style={styles.chev}
                    />
                  </View>
                  <Text style={styles.articleTitle}>{a.title}</Text>
                  <Text style={styles.snippet} numberOfLines={2}>
                    {preview(a.body)}
                  </Text>
                </Pressable>
              ))}
            </>
          ) : (
            <>
              <View style={styles.statsRow}>
                <View style={styles.statCard}>
                  <Text style={styles.statVal}>{completedCount}</Text>
                  <Text style={styles.statLbl}>COMPLETED</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={[styles.statVal, {color: '#2BC4C4'}]}>
                    {totalPoints}
                  </Text>
                  <Text style={styles.statLbl}>POINTS</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={[styles.statVal, {color: '#E4F2FA'}]}>
                    {challenges.length - completedCount}
                  </Text>
                  <Text style={styles.statLbl}>REMAINING</Text>
                </View>
              </View>

              <View style={styles.progressCard}>
                <View style={styles.progressTop}>
                  <Text style={styles.progressLbl}>Explorer Progress</Text>
                  <Text style={styles.progressPct}>{progressPct}%</Text>
                </View>
                <View style={styles.progressTrack}>
                  <View
                    style={[styles.progressFill, {width: `${progressPct}%`}]}
                  />
                </View>
              </View>

              {challenges.map((c, i) => {
                const done = completedMask[i];
                return (
                  <View
                    key={c.id}
                    style={[styles.chCard, done && styles.chCardDone]}>
                    <View style={styles.chRow}>
                      <Pressable
                        accessibilityRole="checkbox"
                        accessibilityState={{checked: done}}
                        hitSlop={8}
                        onPress={() => onToggleChallenge(c.id)}
                        style={[styles.chBox, done && styles.chBoxOn]}>
                        {done ? <Text style={styles.chCheck}>✓</Text> : null}
                      </Pressable>
                      <View style={styles.chMid}>
                        <Text
                          style={[styles.chTitle, done && styles.chTitleDone]}
                          numberOfLines={2}>
                          {c.title}
                        </Text>
                        <Text style={styles.chSub} numberOfLines={3}>
                          {c.subtitle}
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.ptBadge,
                          done ? styles.ptBadgeDone : styles.ptBadgeTodo,
                        ]}>
                        <Text
                          style={[
                            styles.ptTxt,
                            done ? styles.ptTxtDone : styles.ptTxtTodo,
                          ]}>
                          +{c.points}pt
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </>
          )}
        </ScrollView>
      </View>
    </GlacierTrailsIcadventrelay>
  );
};

export default GlacierTrailsIcadventrejornl;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: bg,
  },
  eyebrow: {
    color: eyebrowC,
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 1.2,
    marginBottom: 6.48,
  },
  screenTitle: {
    color: titleC,
    fontSize: 22.44,
    fontWeight: '700',
    marginBottom: 16,
  },
  segment: {
    flexDirection: 'row',
    backgroundColor: '#0D2137',
    borderRadius: 14,
    padding: 4,
    marginBottom: 16,
    gap: 4,
  },
  segBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12.12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segOn: {
    backgroundColor: accent,
  },
  segTxt: {
    color: '#3A6080',
    fontSize: 14.41,
    fontWeight: '800',
    textAlign: 'center',
  },
  segTxtOn: {
    color: '#061220',
  },
  factCard: {
    backgroundColor: '#0D2137',
    borderRadius: 18,
    padding: 16.4,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#4AAAD4',
  },
  factTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12.143,
    gap: 12,
  },
  factIcon: {
    width: 30.3,
    height: 30.3,
    borderRadius: 8.08,
    backgroundColor: '#061220',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#4AAAD4',
  },
  factIconTxt: {
    fontSize: 12.12,
  },
  factHeadTxt: {
    flex: 1,
  },
  factLabel: {
    color: accent,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  factDate: {
    color: muted,
    fontSize: 12,
    marginTop: 4,
  },
  factBody: {
    color: '#E4F2FA',
    fontSize: 13,
    lineHeight: 22,
  },
  articleCard: {
    backgroundColor: '#002F6D',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#1A3A5C',
  },
  articleTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  tagPill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 7,
    borderWidth: 1,
    backgroundColor: '#002F6D',
  },
  tagPillTxt: {
    color: '#4AAAD4',
    fontSize: 10,
    fontWeight: '600',
  },
  chev: {
    color: muted,
    fontSize: 22,
    fontWeight: '300',
  },
  articleTitle: {
    color: titleC,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 8,
  },
  snippet: {
    color: '#6BA8C8',
    fontSize: 13,
    lineHeight: 18,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 13,
  },
  statCard: {
    flex: 1,
    minWidth: 110,
    backgroundColor: '#0D2137',
    borderRadius: 16,
    paddingVertical: 14,
    minHeight: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statVal: {
    color: accent,
    fontSize: 26,
    fontWeight: '800',
  },
  statLbl: {
    marginTop: 6,
    color: '#3A6080',
    fontSize: 11,
    fontWeight: '400',
    letterSpacing: 0.6,
  },
  progressCard: {
    backgroundColor: '#002F6D',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  progressTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  progressLbl: {
    color: titleC,
    fontSize: 15,
    fontWeight: '700',
  },
  progressPct: {
    color: accent,
    fontSize: 15,
    fontWeight: '800',
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#061220',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: '#4AAAD4',
  },
  chCard: {
    backgroundColor: '#002F6D',
    borderRadius: 16,
    padding: 14,
    marginBottom: 8,
    minHeight: 90,
    justifyContent: 'center',
  },
  chCardDone: {
    borderWidth: 1,
    borderColor: accent,
  },
  chRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  chBox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#1A3A5C',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  chBoxOn: {
    backgroundColor: accent,
    borderColor: accent,
  },
  chCheck: {
    color: '#061E3E',
    fontSize: 16,
    fontWeight: '900',
  },
  chMid: {
    flex: 1,
    minWidth: 0,
  },
  chTitle: {
    color: titleC,
    fontSize: 15,
    fontWeight: '700',
  },
  chTitleDone: {
    textDecorationLine: 'line-through',
    color: '#6BA8C8',
  },
  chSub: {
    color: '#6BA8C8',
    fontSize: 12,
    lineHeight: 17,
    marginTop: 6,
  },
  ptBadge: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  ptBadgeDone: {
    backgroundColor: '#061220',
    borderWidth: 1,
    borderColor: '#4AAAD4',
  },
  ptBadgeTodo: {
    backgroundColor: '#4AAAD4',
  },
  ptTxt: {
    fontSize: 12,
    fontWeight: '600',
  },
  ptTxtDone: {
    color: '#4AAAD4',
  },
  ptTxtTodo: {
    color: '#3A6080',
  },
});
