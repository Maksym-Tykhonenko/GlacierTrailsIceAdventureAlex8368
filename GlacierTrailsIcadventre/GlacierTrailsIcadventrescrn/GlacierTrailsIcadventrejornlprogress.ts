import AsyncStorage from '@react-native-async-storage/async-storage';

const key = 'glaciertrailsIcadventrejornlProgV1';

type Stored = {
  mapGlacierIds: string[];
  articleIdsRead: string[];
  manualChallengeIds: string[];
};

const empty = (): Stored => ({
  mapGlacierIds: [],
  articleIdsRead: [],
  manualChallengeIds: [],
});

const listeners = new Set<() => void>();

export const notifyJournalProgress = () => {
  for (const fn of listeners) {
    fn();
  }
};

export const subscribeJournalProgress = (fn: () => void) => {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
};

async function read(): Promise<Stored> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) {
      return empty();
    }
    const parsed = JSON.parse(raw) as Partial<Stored>;
    return {
      mapGlacierIds: Array.isArray(parsed.mapGlacierIds)
        ? [...new Set(parsed.mapGlacierIds)]
        : [],
      articleIdsRead: Array.isArray(parsed.articleIdsRead)
        ? [...new Set(parsed.articleIdsRead)]
        : [],
      manualChallengeIds: Array.isArray(parsed.manualChallengeIds)
        ? [...new Set(parsed.manualChallengeIds)]
        : [],
    };
  } catch {
    return empty();
  }
}

async function write(data: Stored) {
  await AsyncStorage.setItem(key, JSON.stringify(data));
}

export async function loadJournalProgress(): Promise<Stored> {
  return read();
}

export async function recordMapGlacierTap(glacierId: string): Promise<void> {
  const cur = await read();
  if (cur.mapGlacierIds.includes(glacierId)) {
    notifyJournalProgress();
    return;
  }
  cur.mapGlacierIds.push(glacierId);
  await write(cur);
  notifyJournalProgress();
}

export async function recordArticleOpened(articleId: string): Promise<void> {
  const cur = await read();
  if (cur.articleIdsRead.includes(articleId)) {
    notifyJournalProgress();
    return;
  }
  cur.articleIdsRead.push(articleId);
  await write(cur);
  notifyJournalProgress();
}

export async function toggleChallengeManualDone(
  challengeId: string,
): Promise<void> {
  const cur = await read();
  const set = new Set(cur.manualChallengeIds);
  if (set.has(challengeId)) {
    set.delete(challengeId);
  } else {
    set.add(challengeId);
  }
  cur.manualChallengeIds = [...set];
  await write(cur);
  notifyJournalProgress();
}
