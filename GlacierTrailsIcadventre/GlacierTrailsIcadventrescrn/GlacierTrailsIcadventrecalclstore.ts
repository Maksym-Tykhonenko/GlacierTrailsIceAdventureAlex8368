import AsyncStorage from '@react-native-async-storage/async-storage';

import type {GlacierTrailsIcadventrecalclCalcKind} from '../GlacierTrailsIcadventretypes/glaciertrailsIcadventrecalclnavtypes';

const key = 'glaciertrailsIcadventrecalclSavedV1';

export type GlacierTrailsIcadventrecalclSavedRow = {
  id: string;
  kind: GlacierTrailsIcadventrecalclCalcKind;
  title: string;
  summary: string;
  detail: string;
  savedAt: number;
};

async function readAll(): Promise<GlacierTrailsIcadventrecalclSavedRow[]> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as GlacierTrailsIcadventrecalclSavedRow[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeAll(rows: GlacierTrailsIcadventrecalclSavedRow[]) {
  await AsyncStorage.setItem(key, JSON.stringify(rows));
}

export async function loadSavedCalcs(): Promise<
  GlacierTrailsIcadventrecalclSavedRow[]
> {
  const rows = await readAll();
  return rows.sort((a, b) => b.savedAt - a.savedAt);
}

export async function countSavedCalcs(): Promise<number> {
  const rows = await readAll();
  return rows.length;
}

export async function appendSavedCalc(
  row: Omit<GlacierTrailsIcadventrecalclSavedRow, 'id' | 'savedAt'>,
): Promise<void> {
  const rows = await readAll();
  const next: GlacierTrailsIcadventrecalclSavedRow = {
    ...row,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    savedAt: Date.now(),
  };
  rows.unshift(next);
  await writeAll(rows);
}

export async function removeSavedCalc(id: string): Promise<void> {
  const rows = (await readAll()).filter(r => r.id !== id);
  await writeAll(rows);
}
