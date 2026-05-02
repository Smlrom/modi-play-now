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
}

const STORAGE_KEY = "modi-progress";

const loadProgress = (): ProgressData => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { levelsCompleted: [], records: [], totalClicks: 0 };
};

export const useProgress = () => {
  const [data, setData] = useState<ProgressData>(loadProgress);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const addRecord = useCallback((record: Omit<GameRecord, "date">) => {
    setData((prev) => {
      const newRecords = [...prev.records, { ...record, date: new Date().toISOString() }];
      const newCompleted =
        record.result === "victory" && !prev.levelsCompleted.includes(record.levelId)
          ? [...prev.levelsCompleted, record.levelId]
          : prev.levelsCompleted;
      return {
        levelsCompleted: newCompleted,
        records: newRecords,
        totalClicks: prev.totalClicks + record.clicks,
      };
    });
  }, []);

  const addClick = useCallback(() => {
    setData((prev) => ({ ...prev, totalClicks: prev.totalClicks + 1 }));
  }, []);

  return { progress: data, addRecord, addClick };
};
