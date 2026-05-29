import AsyncStorage from '@react-native-async-storage/async-storage';

const key = 'glaciertrailsIcadventrenvgtrBestV1';

export async function loadNvgtrBest(): Promise<number> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) {
      return 0;
    }
    const n = parseInt(raw, 10);
    return Number.isFinite(n) ? n : 0;
  } catch {
    return 0;
  }
}

export async function saveNvgtrBest(score: number): Promise<void> {
  const cur = await loadNvgtrBest();
  if (score > cur) {
    await AsyncStorage.setItem(key, String(score));
  }
}
