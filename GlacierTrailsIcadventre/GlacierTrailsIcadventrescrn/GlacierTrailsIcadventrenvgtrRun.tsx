import {useFocusEffect, useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import type {GlacierTrailsIcadventrenvgtrStackParamList} from '../GlacierTrailsIcadventretypes/glaciertrailsIcadventrenvgtrnavtypes';
import {loadNvgtrBest, saveNvgtrBest} from './GlacierTrailsIcadventrenvgtrbest';
import Orientation from 'react-native-orientation-locker';

const bg = '#144881';
const accent = '#5BB0D9';
const titleC = '#E4F2FA';

type Nav = StackNavigationProp<
  GlacierTrailsIcadventrenvgtrStackParamList,
  'GlacierTrailsIcadventrenvgtrRun'
>;

type Ent = {
  id: string;
  kind: 'star' | 'berg';
  x: number;
  y: number;
};

const SHIP_W = 90;
const SHIP_H = 130;
const SHIP_R = 82;
const STAR_R = 16;
const BERG_R = 26;
const STAR_SCORE = 10;
const BASE_SCROLL = 150;
const MOVE_SPEED = 320;

const menuHeroSource = require('../../assets/imgs/glaciertrailsnvgintr.png');

function dist(ax: number, ay: number, bx: number, by: number) {
  const dx = ax - bx;
  const dy = ay - by;
  return Math.hypot(dx, dy);
}

const GlacierTrailsIcadventrenvgtrRun = () => {
  const {width: winW, height: winH} = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<Nav>();

  const hudH = 52 + insets.top;
  const ctrlH = 88 + Math.max(insets.bottom, 12);
  const arenaH = Math.max(200, winH - hudH - ctrlH);
  const arenaW = winW;

  const shipYA = arenaH - 72;
  const despawnY = arenaH + 80;

  const shipCxRef = useRef(arenaW / 2);
  const leftRef = useRef(false);
  const rightRef = useRef(false);
  const entitiesRef = useRef<Ent[]>([]);
  const spawnAccRef = useRef(0);
  const idRef = useRef(0);
  const scoreRef = useRef(0);
  const livesRef = useRef(3);
  const phaseRef = useRef<'play' | 'pause' | 'over'>('play');
  const bestRef = useRef(0);

  const [shipCx, setShipCx] = useState(arenaW / 2);
  const [entities, setEntities] = useState<Ent[]>([]);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<'play' | 'pause' | 'over'>('play');
  const [best, setBest] = useState(0);
  const [bestAtRun, setBestAtRun] = useState(0);

  phaseRef.current = phase;

  useFocusEffect(
    useCallback(() => {
      Orientation.lockToPortrait();
      return () => {
        Orientation.unlockAllOrientations();
      };
    }, []),
  );

  useEffect(() => {
    loadNvgtrBest().then(b => {
      bestRef.current = b;
      setBest(b);
    });
  }, []);

  const resetGame = useCallback(() => {
    loadNvgtrBest().then(b => {
      bestRef.current = b;
      setBest(b);
      setBestAtRun(b);
    });
    shipCxRef.current = arenaW / 2;
    setShipCx(arenaW / 2);
    leftRef.current = false;
    rightRef.current = false;
    entitiesRef.current = [];
    setEntities([]);
    spawnAccRef.current = 0;
    scoreRef.current = 0;
    livesRef.current = 3;
    setScore(0);
    setLives(3);
    setPhase('play');
    phaseRef.current = 'play';
  }, [arenaW]);

  useFocusEffect(
    useCallback(() => {
      resetGame();
    }, [resetGame]),
  );

  useEffect(() => {
    if (phase !== 'play') {
      return;
    }
    let alive = true;
    let last = Date.now();

    const loop = () => {
      if (!alive || phaseRef.current !== 'play') {
        return;
      }
      const now = Date.now();
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      let v = 0;
      if (leftRef.current) {
        v -= 1;
      }
      if (rightRef.current) {
        v += 1;
      }
      const nx = Math.max(
        20 + SHIP_W / 2,
        Math.min(
          arenaW - 20 - SHIP_W / 2,
          shipCxRef.current + v * MOVE_SPEED * dt,
        ),
      );
      shipCxRef.current = nx;
      setShipCx(nx);

      const sc = scoreRef.current;
      const scroll = BASE_SCROLL + Math.min(170, Math.floor(sc / 50) * 12);
      let moved = entitiesRef.current.map(e => ({
        ...e,
        y: e.y + scroll * dt,
      }));
      moved = moved.filter(e => e.y < despawnY);

      spawnAccRef.current += dt * 1000;
      const spawnEvery = Math.max(520, 1100 - Math.min(400, sc * 3));
      if (spawnAccRef.current >= spawnEvery) {
        spawnAccRef.current = 0;
        const margin = 36;
        const x = margin + Math.random() * (arenaW - margin * 2);
        const kind: Ent['kind'] = Math.random() < 0.44 ? 'star' : 'berg';
        idRef.current += 1;
        moved.push({
          id: `e-${idRef.current}`,
          kind,
          x,
          y: -40,
        });
      }

      const shipCy = shipYA;
      let starGain = 0;
      let bergHit = false;
      const survived: Ent[] = [];

      for (const e of moved) {
        const er = e.kind === 'star' ? STAR_R : BERG_R;
        if (dist(e.x, e.y, nx, shipCy) < SHIP_R + er) {
          if (e.kind === 'star') {
            starGain += STAR_SCORE;
          } else {
            bergHit = true;
          }
        } else {
          survived.push(e);
        }
      }

      if (starGain > 0) {
        scoreRef.current += starGain;
        setScore(scoreRef.current);
      }
      if (bergHit) {
        livesRef.current -= 1;
        setLives(livesRef.current);
        if (livesRef.current <= 0) {
          alive = false;
          const finalScore = scoreRef.current;
          saveNvgtrBest(finalScore).then(() =>
            loadNvgtrBest().then(b => {
              bestRef.current = b;
              setBest(b);
            }),
          );
          setPhase('over');
          phaseRef.current = 'over';
          return;
        }
      }

      entitiesRef.current = survived;
      setEntities(survived);
    };

    const id = setInterval(loop, 1000 / 33);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [phase, arenaW, arenaH, shipYA, despawnY]);

  const setLeft = (on: boolean) => {
    leftRef.current = on;
  };
  const setRight = (on: boolean) => {
    rightRef.current = on;
  };

  const isNewRecord = phase === 'over' && score > 0 && score > bestAtRun;

  const heroOverlayH = Math.min(400, Math.round(winH * 0.46));

  return (
    <View style={styles.root}>
      <View style={[styles.hud, {paddingTop: insets.top + 8, height: hudH}]}>
        <View style={styles.hudLeft}>
          {[0, 1, 2].map(i => (
            <Image
              key={`life-${i}`}
              source={
                i >= lives
                  ? require('../../assets/imgs/glaciertrailsgmliked.png')
                  : require('../../assets/imgs/glaciertrailsnvgmlik.png')
              }
            />
          ))}
        </View>
        <View style={styles.hudMid}>
          <Text style={styles.starIco}>⭐</Text>
          <Text style={styles.scoreTxt}>{score}</Text>
        </View>
        <Pressable
          onPress={() => {
            if (phase === 'play') {
              setPhase('pause');
              phaseRef.current = 'pause';
            }
          }}
          style={styles.pauseBtn}
          hitSlop={8}>
          <Image
            source={require('../../assets/imgs/glaciertrailsnvpaus.png')}
            style={styles.pauseIcon}
          />
        </Pressable>
      </View>

      <ImageBackground
        source={require('../../assets/imgs/glaciertrailsnvggmgb.png')}
        style={[styles.arena, {height: '100%', width: arenaW}]}
        resizeMode="cover">
        {entities.map(e => (
          <Image
            key={e.id}
            source={
              e.kind === 'star'
                ? require('../../assets/imgs/glaciertrailsnvgstr.png')
                : require('../../assets/imgs/glaciertrailsnvgtberg.png')
            }
            style={[
              styles.entImg,
              {
                left: e.x - (e.kind === 'star' ? 18 : 24),
                top: e.y - (e.kind === 'star' ? 18 : 26),
                width: e.kind === 'star' ? 40 : 90,
                height: e.kind === 'star' ? 30 : 70,
              },
            ]}
            resizeMode="contain"
          />
        ))}
        <Image
          source={require('../../assets/imgs/glaciertrailsnvgboat.png')}
          style={{
            position: 'absolute',
            left: shipCx - SHIP_W / 2,
            top: shipYA - SHIP_H / 2,
            width: SHIP_W,
            height: SHIP_H,
          }}
          resizeMode="contain"
        />
      </ImageBackground>

      <View
        style={[
          styles.ctrl,
          {paddingBottom: Math.max(insets.bottom, 12), height: ctrlH},
        ]}>
        <Pressable
          onPressIn={() => setLeft(true)}
          onPressOut={() => setLeft(false)}
          style={({pressed}) => [styles.dir, pressed && {opacity: 0.85}]}>
          <Image source={require('../../assets/imgs/glaciertrailslef.png')} />
        </Pressable>
        <Pressable
          onPressIn={() => setRight(true)}
          onPressOut={() => setRight(false)}
          style={({pressed}) => [styles.dir, pressed && {opacity: 0.85}]}>
          <Image source={require('../../assets/imgs/glaciertrailsnvrig.png')} />
        </Pressable>
      </View>

      {phase === 'pause' ? (
        <View style={[styles.menuFull, styles.menuFullOverlay]}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}>
            <Image
              source={menuHeroSource}
              style={[styles.menuHero, {height: heroOverlayH}]}
              resizeMode="cover"
            />
            <View
              style={[styles.menuPanel, {paddingBottom: insets.bottom + 28}]}>
              <Text style={styles.menuTitle}>Game Paused</Text>
              <Text style={styles.menuDesc}>
                The ice field is waiting. Your ship is safe for now, but the
                next wave of icebergs is still ahead.
              </Text>
              <Pressable
                onPress={() => {
                  setPhase('play');
                  phaseRef.current = 'play';
                }}
                style={({pressed}) => [
                  styles.menuBtnPrimary,
                  pressed && {opacity: 0.92},
                ]}>
                <Text style={styles.menuBtnPrimaryTxt}>Resume</Text>
              </Pressable>
              <Pressable
                onPress={() => nav.navigate('GlacierTrailsIcadventrenvgtrMenu')}
                style={({pressed}) => [
                  styles.menuBtnGhost,
                  pressed && {opacity: 0.9},
                ]}>
                <Text style={styles.menuBtnGhostTxt}>Back to Menu</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      ) : null}

      {phase === 'over' ? (
        <View style={[styles.menuFull, styles.menuFullOverlay]}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}>
            <Image
              source={menuHeroSource}
              style={[styles.menuHero, {height: heroOverlayH}]}
              resizeMode="cover"
            />
            <View
              style={[styles.menuPanel, {paddingBottom: insets.bottom + 28}]}>
              <Text style={[styles.menuTitle, styles.menuTitleTight]}>
                Game Over
              </Text>
              <View style={styles.goScoreRow}>
                <View style={styles.goCard}>
                  <Text style={styles.goLbl}>YOUR SCORE</Text>
                  <Text style={styles.goValY}>{score}</Text>
                </View>
                <View style={styles.goCard}>
                  <Text style={styles.goLbl}>BEST SCORE</Text>
                  <Text style={styles.goValB}>{Math.max(best, score)}</Text>
                </View>
              </View>
              {isNewRecord ? (
                <View style={styles.goBadge}>
                  <Text style={styles.goBadgeTxt}>🏆 New Record!</Text>
                </View>
              ) : null}
              <Pressable
                onPress={resetGame}
                style={({pressed}) => [
                  styles.menuBtnPrimary,
                  pressed && {opacity: 0.92},
                ]}>
                <Text style={styles.menuBtnPrimaryTxt}>Play Again</Text>
              </Pressable>
              <Pressable
                onPress={() => nav.replace('GlacierTrailsIcadventrenvgtrMenu')}
                style={({pressed}) => [
                  styles.menuBtnGhost,
                  pressed && {opacity: 0.9},
                ]}>
                <Text style={styles.menuBtnGhostTxt}>Back to Menu</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      ) : null}
    </View>
  );
};

export default GlacierTrailsIcadventrenvgtrRun;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: bg,
  },
  hud: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    backgroundColor: '#0A2342',
    zIndex: 100,
    paddingBottom: 12.1,
  },
  hudLeft: {
    flexDirection: 'row',
    gap: 4.1,
    width: 90,
  },
  heart: {
    fontSize: 22.3,
    color: '#CC2020',
  },
  heartOff: {
    color: '#2A3F55',
  },
  hudMid: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6.122,
  },
  starIco: {
    fontSize: 18,
  },
  scoreTxt: {
    color: '#F5D547',
    fontSize: 22,
    fontWeight: '800',
  },
  pauseBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#061220',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  pauseBar: {
    width: 5,
    height: 18.2,
    borderRadius: 1,
    backgroundColor: titleC,
  },
  arena: {
    backgroundColor: '#1A5A8A',
  },
  entImg: {
    position: 'absolute',
  },
  ctrl: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 28,
    paddingTop: 12.1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  dir: {
    width: 72,
    height: 72,
    borderRadius: 20.102,
    backgroundColor: '#0D2137',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#1A3F63',
  },
  dirTxt: {
    color: accent,
    fontSize: 36,
    fontWeight: '300',
    marginTop: -4.1,
  },
  menuFull: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: bg,
    flex: 1,
    flexDirection: 'column',
  },
  menuFullOverlay: {
    zIndex: 100,
  },
  menuHero: {
    width: '100%',
    backgroundColor: '#0A2342',
  },
  menuPanel: {
    flex: 1,
    backgroundColor: bg,
    paddingHorizontal: 18,
    paddingTop: 20.1,
  },
  menuTitle: {
    color: titleC,
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 12.4,
  },
  menuTitleTight: {
    marginBottom: 18.254,
  },
  menuDesc: {
    color: '#6BA8C8',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 22,
    paddingHorizontal: 20,
  },
  menuBtnPrimary: {
    backgroundColor: '#4AAAD4',
    borderRadius: 18.434,
    height: 60.43,
    width: '93%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14.43,
  },
  menuBtnPrimaryTxt: {
    color: '#061220',
    fontSize: 18.41,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  menuBtnGhost: {
    height: 58,
    width: '93%',
    alignSelf: 'center',
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#1A3A5C',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  menuBtnGhostTxt: {
    color: '#6BA8C8',
    fontSize: 16,
    fontWeight: '700',
  },
  goScoreRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 18,
    width: '83%',
    alignSelf: 'center',
  },
  goCard: {
    flex: 1,
    backgroundColor: '#002F6D',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#1A3A5C',
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  goLbl: {
    color: '#6BA8C8',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  goValY: {
    color: '#F0C020',
    fontSize: 36,
    fontWeight: '800',
  },
  goValB: {
    color: '#4AAAD4',
    fontSize: 36,
    fontWeight: '800',
  },
  goBadge: {
    alignSelf: 'center',
    marginBottom: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#0D2B0D',
    borderWidth: 1,
    borderColor: '#2BC4C4',
  },
  goBadgeTxt: {
    color: '#5EE79A',
    fontSize: 13,
    fontWeight: '700',
  },
});
