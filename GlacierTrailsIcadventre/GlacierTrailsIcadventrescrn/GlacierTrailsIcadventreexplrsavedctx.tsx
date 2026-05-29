import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const glaciertrailsIcadventreexplrSavedKey =
  'glaciertrailsIcadventreexplrSavedIdsV1';

type GlacierTrailsIcadventreexplrSavedCtx = {
  isSaved: (id: string) => boolean;
  toggleSaved: (id: string) => void;
  savedCount: number;
  savedKey: string;
};

const GlacierTrailsIcadventreexplrSavedContext =
  createContext<GlacierTrailsIcadventreexplrSavedCtx | null>(null);

export const GlacierTrailsIcadventreexplrSavedProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [glaciertrailsIcadventreexplrSaved, setGlaciertrailsIcadventreexplrSaved] =
    useState<Set<string>>(new Set());

  useEffect(() => {
    let glaciertrailsIcadventreexplrAlive = true;
    AsyncStorage.getItem(glaciertrailsIcadventreexplrSavedKey).then(raw => {
      if (!glaciertrailsIcadventreexplrAlive || !raw) {
        return;
      }
      try {
        const glaciertrailsIcadventreexplrParsed = JSON.parse(raw) as string[];
        setGlaciertrailsIcadventreexplrSaved(new Set(glaciertrailsIcadventreexplrParsed));
      } catch {
        /* ignore */
      }
    });
    return () => {
      glaciertrailsIcadventreexplrAlive = false;
    };
  }, []);

  const glaciertrailsIcadventreexplrToggle = useCallback(
    (id: string) => {
      setGlaciertrailsIcadventreexplrSaved(prev => {
        const glaciertrailsIcadventreexplrNext = new Set(prev);
        if (glaciertrailsIcadventreexplrNext.has(id)) {
          glaciertrailsIcadventreexplrNext.delete(id);
        } else {
          glaciertrailsIcadventreexplrNext.add(id);
        }
        void AsyncStorage.setItem(
          glaciertrailsIcadventreexplrSavedKey,
          JSON.stringify([...glaciertrailsIcadventreexplrNext]),
        );
        return glaciertrailsIcadventreexplrNext;
      });
    },
    [],
  );

  const glaciertrailsIcadventreexplrIsSaved = useCallback(
    (id: string) => glaciertrailsIcadventreexplrSaved.has(id),
    [glaciertrailsIcadventreexplrSaved],
  );

  const glaciertrailsIcadventreexplrValue = useMemo(
    (): GlacierTrailsIcadventreexplrSavedCtx => ({
      isSaved: glaciertrailsIcadventreexplrIsSaved,
      toggleSaved: glaciertrailsIcadventreexplrToggle,
      savedCount: glaciertrailsIcadventreexplrSaved.size,
      savedKey: [...glaciertrailsIcadventreexplrSaved].sort().join(','),
    }),
    [
      glaciertrailsIcadventreexplrIsSaved,
      glaciertrailsIcadventreexplrToggle,
      glaciertrailsIcadventreexplrSaved,
    ],
  );

  return (
    <GlacierTrailsIcadventreexplrSavedContext.Provider
      value={glaciertrailsIcadventreexplrValue}>
      {children}
    </GlacierTrailsIcadventreexplrSavedContext.Provider>
  );
};

export const useGlacierTrailsIcadventreexplrSaved = () => {
  const glaciertrailsIcadventreexplrCtx = useContext(
    GlacierTrailsIcadventreexplrSavedContext,
  );
  if (!glaciertrailsIcadventreexplrCtx) {
    throw new Error('useGlacierTrailsIcadventreexplrSaved: missing provider');
  }
  return glaciertrailsIcadventreexplrCtx;
};
