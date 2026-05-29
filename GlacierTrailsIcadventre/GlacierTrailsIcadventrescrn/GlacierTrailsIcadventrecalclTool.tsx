import {
  useNavigation,
  useRoute,
  type RouteProp,
} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React, {useMemo, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import type {
  GlacierTrailsIcadventrecalclCalcKind,
  GlacierTrailsIcadventrecalclStackParamList,
} from '../GlacierTrailsIcadventretypes/glaciertrailsIcadventrecalclnavtypes';
import GlacierTrailsIcadventrelay from '../GlacierTrailsIcadventrecmp/GlacierTrailsIcadventrelay';
import {appendSavedCalc} from './GlacierTrailsIcadventrecalclstore';

const bg = '#144881';
const titleC = '#E4F2FA';
const muted = '#7E9AB5';
const card = '#082A4A';
const inputBg = '#0D2137';
const btnDark = '#061E3E';

type Nav = StackNavigationProp<
  GlacierTrailsIcadventrecalclStackParamList,
  'GlacierTrailsIcadventrecalclTool'
>;

const meta: Record<
  GlacierTrailsIcadventrecalclCalcKind,
  {title: string; accent: string; btnText: string}
> = {
  melt: {
    title: 'Glacier Melt Calculator',
    accent: '#4AAAD4',
    btnText: '#061E3E',
  },
  retreat: {
    title: 'Glacier Retreat Calculator',
    accent: '#2BC4C4',
    btnText: '#061E3E',
  },
  mass: {
    title: 'Ice Mass Loss Calculator',
    accent: '#F0A020',
    btnText: '#061E3E',
  },
  life: {
    title: 'Glacier Lifetime Estimate',
    accent: '#CC2020',
    btnText: '#061220',
  },
};

function parseNum(s: string): number | null {
  const v = parseFloat(s.replace(',', '.').trim());
  return Number.isFinite(v) ? v : null;
}

function fmt(n: number, d = 2) {
  if (!Number.isFinite(n)) {
    return '—';
  }
  return n.toFixed(d);
}

const GlacierTrailsIcadventrecalclTool = () => {
  const insets = useSafeAreaInsets();
  const nav = useNavigation<Nav>();
  const route =
    useRoute<
      RouteProp<
        GlacierTrailsIcadventrecalclStackParamList,
        'GlacierTrailsIcadventrecalclTool'
      >
    >();
  const calculator = route.params.calculator;
  const m = meta[calculator];

  const [a1, setA1] = useState('');
  const [a2, setA2] = useState('');
  const [a3, setA3] = useState('');
  const [a4, setA4] = useState('');
  const [show, setShow] = useState(false);

  const result = useMemo(() => {
    if (!show) {
      return null;
    }
    if (calculator === 'melt') {
      const T = parseNum(a1);
      const area = parseNum(a2);
      const alb = parseNum(a3);
      if (T === null || area === null || alb === null) {
        return {err: 'Enter valid numbers.'};
      }
      if (alb < 0 || alb > 1) {
        return {err: 'Albedo must be between 0 and 1.'};
      }
      const melt = area * Math.max(0, T) * (1 - alb) * 2.125;
      const absorb = Math.round((1 - alb) * 100);
      return {
        ok: true as const,
        primary: `Estimated annual melt volume: ${fmt(melt)} km³/year`,
        lines: [
          `Melt rate factor: ${absorb}% of incoming energy absorbed`,
          `Effective melt area: ${fmt(area, 2)} km²`,
        ],
        saveSummary: `${fmt(melt)} km³/year`,
        saveDetail: `T=${T}°C, area=${area} km², albedo=${alb}`,
      };
    }
    if (calculator === 'retreat') {
      const L = parseNum(a1);
      const r = parseNum(a2);
      const y = parseNum(a3);
      if (L === null || r === null || y === null) {
        return {err: 'Enter valid numbers.'};
      }
      if (L <= 0 || y <= 0 || r < 0) {
        return {err: 'Use positive length and years.'};
      }
      const retreatKm = (r * y) / 1000;
      const finalKm = Math.max(0, L - retreatKm);
      const pct = L > 0 ? (retreatKm / L) * 100 : 0;
      return {
        ok: true as const,
        primary: 'Estimated Results',
        retreatKm,
        finalKm,
        lines: [
          `Analysis: At this rate, the glacier will lose approximately ${fmt(
            pct,
            2,
          )}% of its current length over the next ${Math.round(y)} years.`,
        ],
        saveSummary: `Retreat ${fmt(retreatKm)} km → ${fmt(finalKm)} km`,
        saveDetail: `L=${L} km, rate=${r} m/y, years=${y}`,
      };
    }
    if (calculator === 'mass') {
      const area = parseNum(a1);
      const thick = parseNum(a2);
      const dens = parseNum(a3);
      const pct = parseNum(a4);
      if (area === null || thick === null || dens === null || pct === null) {
        return {err: 'Enter valid numbers.'};
      }
      if (pct < 0 || pct > 100) {
        return {err: 'Melt percentage must be 0–100.'};
      }
      const massKg = area * 1e6 * thick * dens;
      const lossKgYr = massKg * (pct / 100);
      const mtYr = lossKgYr / 1e9;
      return {
        ok: true as const,
        primary: `Estimated annual ice mass loss: ${fmt(mtYr, 3)} Gt/year`,
        lines: [
          `Total ice mass (approx.): ${fmt(massKg / 1e12, 3)} Gt`,
          `Using ${pct}% annual melt of stored mass.`,
        ],
        saveSummary: `${fmt(mtYr, 3)} Gt/year`,
        saveDetail: `A=${area} km², H=${thick} m, ρ=${dens}, melt=${pct}%`,
      };
    }
    const vol = parseNum(a1);
    const loss = parseNum(a2);
    if (vol === null || loss === null) {
      return {err: 'Enter valid numbers.'};
    }
    if (loss <= 0 || vol <= 0) {
      return {err: 'Volume and annual loss must be > 0.'};
    }
    const yrs = vol / loss;
    return {
      ok: true as const,
      primary: `Estimated time until volume loss: ${fmt(yrs, 1)} years`,
      lines: [
        `At a constant loss of ${fmt(loss, 3)} km³/year, ${fmt(
          vol,
          2,
        )} km³ would be depleted in this simplified model.`,
      ],
      saveSummary: `${fmt(yrs, 1)} years`,
      saveDetail: `V=${vol} km³, loss=${loss} km³/year`,
    };
  }, [show, calculator, a1, a2, a3, a4]);

  const share = () => {
    if (!result || !('ok' in result) || !result.ok) {
      return;
    }
    Share.share({
      title: m.title,
      message: [result.primary, ...(result.lines ?? [])].join('\n'),
    }).catch(() => {});
  };

  const save = () => {
    if (!result || !('ok' in result) || !result.ok) {
      return;
    }
    void appendSavedCalc({
      kind: calculator,
      title: m.title,
      summary: result.saveSummary,
      detail: result.saveDetail,
    });
  };

  const run = () => {
    setShow(true);
  };

  const fields =
    calculator === 'melt'
      ? [
          {
            label: 'Mean Summer Temperature (°C)',
            ph: 'e.g. 5',
            unit: '°C',
            val: a1,
            set: setA1,
          },
          {
            label: 'Glacier Surface Area (km²)',
            ph: 'e.g. 10',
            unit: 'km²',
            val: a2,
            set: setA2,
          },
          {
            label: 'Surface Albedo (0–1)',
            ph: 'e.g. 0.6',
            unit: '',
            val: a3,
            set: setA3,
          },
        ]
      : calculator === 'retreat'
      ? [
          {
            label: 'Current Glacier Length (km)',
            ph: 'e.g. 7',
            unit: 'km',
            val: a1,
            set: setA1,
          },
          {
            label: 'Annual Retreat Rate (m/year)',
            ph: 'e.g. 20',
            unit: 'm/year',
            val: a2,
            set: setA2,
          },
          {
            label: 'Years to Project (years)',
            ph: 'e.g. 50',
            unit: 'years',
            val: a3,
            set: setA3,
          },
        ]
      : calculator === 'mass'
      ? [
          {
            label: 'Glacier Area (km²)',
            ph: 'e.g. 30',
            unit: 'km²',
            val: a1,
            set: setA1,
          },
          {
            label: 'Average Ice Thickness (m)',
            ph: 'e.g. 200',
            unit: 'm',
            val: a2,
            set: setA2,
          },
          {
            label: 'Ice Density (kg/m³)',
            ph: 'e.g. 917',
            unit: 'kg/m³',
            val: a3,
            set: setA3,
          },
          {
            label: 'Annual Melt Percentage (%)',
            ph: 'e.g. 2',
            unit: '%',
            val: a4,
            set: setA4,
          },
        ]
      : [
          {
            label: 'Current Ice Volume (km³)',
            ph: 'e.g. 5',
            unit: 'km³',
            val: a1,
            set: setA1,
          },
          {
            label: 'Annual Volume Loss (km³/year)',
            ph: 'e.g. 0.1',
            unit: 'km³/year',
            val: a2,
            set: setA2,
          },
        ];

  return (
    <GlacierTrailsIcadventrelay>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={[styles.root, {paddingTop: insets.top + 8}]}>
          <View style={styles.headRow}>
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
            <View style={styles.headTxt}>
              <Text style={styles.calcLbl}>CALCULATOR</Text>
              <Text style={styles.calcTitle}>{m.title}</Text>
            </View>
          </View>
          <View style={styles.divider} />

          <View
            style={{
              paddingHorizontal: 18,
              paddingBottom: insets.bottom + 28,
            }}>
            <View style={styles.card}>
              <View style={styles.secHead}>
                <View style={[styles.accentBar, {backgroundColor: m.accent}]} />
                <Text style={styles.secTitle}>Input Parameters</Text>
              </View>
              {fields.map(f => (
                <View key={f.label} style={styles.field}>
                  <Text style={styles.lab}>{f.label}</Text>
                  <View style={styles.inpRow}>
                    <TextInput
                      value={f.val}
                      onChangeText={t => {
                        f.set(t);
                        setShow(false);
                      }}
                      placeholder={f.ph}
                      placeholderTextColor={muted}
                      keyboardType="decimal-pad"
                      style={styles.inp}
                    />
                    {f.unit ? <Text style={styles.unit}>{f.unit}</Text> : null}
                  </View>
                </View>
              ))}
              <Pressable
                onPress={run}
                style={({pressed}) => [
                  styles.calcBtn,
                  {backgroundColor: m.accent},
                  pressed && {opacity: 0.92},
                ]}>
                <Text style={[styles.calcBtnTxt, {color: m.btnText}]}>
                  Calculate
                </Text>
              </Pressable>
            </View>

            {show && result ? (
              <View
                style={[
                  styles.card,
                  {marginTop: 14, borderWidth: 1, borderColor: '#4AAAD4'},
                ]}>
                <View style={styles.secHead}>
                  <View
                    style={[styles.accentBar, {backgroundColor: m.accent}]}
                  />
                  <Text style={styles.secTitle}>
                    {calculator === 'retreat' ? 'Estimated Results' : 'Results'}
                  </Text>
                </View>
                {'err' in result ? (
                  <Text style={styles.err}>{result.err}</Text>
                ) : result.ok && 'retreatKm' in result ? (
                  <>
                    <View style={styles.pairRow}>
                      <View style={styles.pairCard}>
                        <Text style={styles.pairLbl}>Total Retreat</Text>
                        <Text style={styles.pairVal}>
                          {fmt(result.retreatKm ?? 0)} km
                        </Text>
                      </View>
                      <View style={styles.pairCard}>
                        <Text style={styles.pairLbl}>Final Length</Text>
                        <Text style={styles.pairVal}>
                          {fmt(result.finalKm ?? 0)} km
                        </Text>
                      </View>
                    </View>
                    {result.lines?.map(line => (
                      <Text key={line} style={styles.line}>
                        {line}
                      </Text>
                    ))}
                  </>
                ) : result.ok ? (
                  <>
                    <Text style={styles.primaryRes}>{result.primary}</Text>
                    {result.lines?.map(line => (
                      <Text key={line} style={styles.line}>
                        {line}
                      </Text>
                    ))}
                  </>
                ) : null}

                {result && 'ok' in result && result.ok ? (
                  <View style={styles.actions}>
                    <Pressable
                      onPress={save}
                      style={({pressed}) => [
                        styles.outlineBtn,
                        {borderColor: m.accent},
                        pressed && {opacity: 0.9},
                      ]}>
                      <Text style={styles.outlineTxt}>Save Result</Text>
                    </Pressable>
                    <Pressable
                      onPress={share}
                      style={({pressed}) => [
                        styles.fillBtn,
                        {backgroundColor: m.accent},
                        pressed && {opacity: 0.92},
                      ]}>
                      <Text style={[styles.fillBtnTxt, {color: btnDark}]}>
                        Share Result
                      </Text>
                    </Pressable>
                  </View>
                ) : null}
              </View>
            ) : null}
          </View>
        </View>
      </KeyboardAvoidingView>
    </GlacierTrailsIcadventrelay>
  );
};

export default GlacierTrailsIcadventrecalclTool;

const styles = StyleSheet.create({
  flex: {flex: 1},
  root: {
    flex: 1,
    backgroundColor: bg,
  },
  headRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    gap: 12,
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
  backImg: {width: 20.2, height: 20.2113},
  headTxt: {flex: 1, minWidth: 0},
  calcLbl: {
    color: muted,
    fontSize: 11.11,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  calcTitle: {
    color: titleC,
    fontSize: 18,
    fontWeight: '700',
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#1A3A5C',
    marginHorizontal: 18,
    marginBottom: 18.18,
    marginTop: 6,
  },
  card: {
    backgroundColor: '#002F6D',
    borderRadius: 18,
    padding: 16,
  },
  secHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  accentBar: {
    width: 3,
    height: 17,
    borderRadius: 2.1,
  },
  secTitle: {
    color: titleC,
    fontSize: 14,
    fontWeight: '700',
  },
  field: {marginBottom: 14},
  lab: {
    color: '#6BA8C8',
    fontSize: 13,
    marginBottom: 8,
  },
  inpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#144881',
    borderRadius: 14,
    paddingHorizontal: 14.14,
    minHeight: 48,
  },
  inp: {
    flex: 1,
    color: titleC,
    fontSize: 16.16,
    paddingVertical: 12,
  },
  unit: {
    color: muted,
    fontSize: 13.13,
    marginLeft: 8,
  },
  calcBtn: {
    marginTop: 8.1,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
  },
  calcBtnTxt: {
    fontSize: 15.15,
    fontWeight: '700',
  },
  err: {
    color: '#E85A5A',
    fontSize: 15.15,
    fontWeight: '600',
  },
  primaryRes: {
    color: titleC,
    fontSize: 16.16,
    fontWeight: '700',
    lineHeight: 24,
    marginBottom: 10.1,
  },
  line: {
    color: muted,
    fontSize: 14.14,
    lineHeight: 21,
    marginTop: 4,
  },
  pairRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12.12,
  },
  pairCard: {
    flex: 1,
    backgroundColor: bg,
    borderRadius: 14,
    padding: 14,
  },
  pairLbl: {
    color: muted,
    fontSize: 12,
    marginBottom: 6,
  },
  pairVal: {
    color: titleC,
    fontSize: 20,
    fontWeight: '800',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
  },
  outlineBtn: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outlineTxt: {
    color: titleC,
    fontSize: 14,
    fontWeight: '700',
  },
  fillBtn: {
    flex: 1,
    borderRadius: 12,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fillBtnTxt: {
    fontSize: 14,
    fontWeight: '700',
  },
});
