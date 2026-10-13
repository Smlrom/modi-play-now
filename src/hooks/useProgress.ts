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
const EMPTY_PROGRESS: ProgressData = { levelsCompleted: [], records: [], totalClicks: 0 };

const loadProgress = (): ProgressData => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_PROGRESS;
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return EMPTY_PROGRESS;

    const candidate = parsed as Partial<ProgressData>;
    return {
      levelsCompleted: Array.isArray(candidate.levelsCompleted)
        ? candidate.levelsCompleted.filter((id): id is number => Number.isInteger(id) && id > 0)
        : [],
      records: Array.isArray(candidate.records)
        ? candidate.records.filter((record): record is GameRecord =>
            !!record &&
            typeof record === "object" &&
            Number.isInteger((record as GameRecord).levelId) &&
            typeof (record as GameRecord).levelName === "string" &&
            ((record as GameRecord).result === "victory" || (record as GameRecord).result === "defeat") &&
            typeof (record as GameRecord).date === "string" &&
            Number.isFinite((record as GameRecord).clicks))
        : [],
      totalClicks: typeof candidate.totalClicks === "number" && Number.isFinite(candidate.totalClicks)
        ? Math.max(0, Math.floor(candidate.totalClicks))
        : 0,
    };
  } catch {
    return EMPTY_PROGRESS;
  }
};

export const useProgress = () => {
  const [data, setData] = useState<ProgressData>(loadProgress);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Gameplay remains available if storage is disabled or full.
    }
  }, [data]);

  const addRecord = useCallback((record: Omit<GameRecord, "date">) => {
    setData((prev) => {
      const newRecords = [...prev.records, { ...record, date: new Date().toISOString() }];
      const newCompleted =
        record.result === "victory" && !prev.levelsCompleted.includes(record.levelId)
          ? [...prev.levelsCompleted, record.levelId]
          : prev.levelsCompleted;
      // addClick() already counts each answer, so avoid counting the game clicks twice.
      return { ...prev, levelsCompleted: newCompleted, records: newRecords };
    });
  }, []);

  const addClick = useCallback(() => {
    setData((prev) => ({ ...prev, totalClicks: prev.totalClicks + 1 }));
  }, []);

  return { progress: data, addRecord, addClick };
};
