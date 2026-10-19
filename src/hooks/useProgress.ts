import { useState, useEffect, useCallback } from "react";

export interface GameRecord {
  levelId: number;
  levelName: string;
  result: "victory" | "defeat";
  date: string;
  clicks: number;
}

export interface ProgressData {
  levelsCompleted: number[];
  records: GameRecord[];
  totalClicks: number;
  selectedSkin: string;
}

const STORAGE_KEY = "modi-progress";

const DEFAULT_PROGRESS: ProgressData = {
  levelsCompleted: [],
  records: [],
  totalClicks: 0,
  selectedSkin: "classic",
};

const loadProgress = (): ProgressData => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const saved = JSON.parse(raw) as Partial<ProgressData>;
    return {
      levelsCompleted: Array.isArray(saved.levelsCompleted) ? saved.levelsCompleted : [],
      records: Array.isArray(saved.records) ? saved.records : [],
      totalClicks: typeof saved.totalClicks === "number" ? saved.totalClicks : 0,
      selectedSkin: typeof saved.selectedSkin === "string" ? saved.selectedSkin : "classic",
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
};

export const useProgress = () => {
  const [data, setData] = useState<ProgressData>(loadProgress);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Progress remains available for this session if browser storage is disabled/full.
    }
  }, [data]);

  const addRecord = useCallback((record: Omit<GameRecord, "date">) => {
    setData((prev) => {
      const newRecords = [...prev.records, { ...record, date: new Date().toISOString() }];
      const newCompleted =
        record.result === "victory" && !prev.levelsCompleted.includes(record.levelId)
          ? [...prev.levelsCompleted, record.levelId]
          : prev.levelsCompleted;
      return { ...prev, levelsCompleted: newCompleted, records: newRecords };
    });
  }, []);

  const addClick = useCallback(() => {
    setData((prev) => ({ ...prev, totalClicks: prev.totalClicks + 1 }));
  }, []);

  const selectSkin = useCallback((skinId: string) => {
    setData((prev) => ({ ...prev, selectedSkin: skinId }));
  }, []);

  return { progress: data, addRecord, addClick, selectSkin };
};
