import { useState, useEffect, useCallback } from "react";

export interface AppSettings {
  soundEnabled: boolean;
  bgColor: string;
}

const STORAGE_KEY = "modi-settings";

const BG_OPTIONS = [
  { id: "default", label: "Azul cielo", css: "210 50% 96%" },
  { id: "green", label: "Verde menta", css: "150 40% 94%" },
  { id: "pink", label: "Rosa pastel", css: "340 40% 95%" },
  { id: "yellow", label: "Amarillo suave", css: "45 50% 95%" },
  { id: "purple", label: "Lavanda", css: "270 40% 95%" },
] as const;

const DEFAULT_SETTINGS: AppSettings = { soundEnabled: true, bgColor: "default" };

const loadSettings = (): AppSettings => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return DEFAULT_SETTINGS;
    const candidate = parsed as Partial<AppSettings>;
    return {
      soundEnabled: typeof candidate.soundEnabled === "boolean" ? candidate.soundEnabled : true,
      bgColor: BG_OPTIONS.some((option) => option.id === candidate.bgColor)
        ? candidate.bgColor!
        : "default",
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
};

export const useSettings = () => {
  const [settings, setSettingsState] = useState<AppSettings>(loadSettings);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // Preferences still work for the current session if storage is unavailable.
    }
    const selected = BG_OPTIONS.find((option) => option.id === settings.bgColor) ?? BG_OPTIONS[0];
    document.documentElement.style.setProperty("--background", selected.css);
  }, [settings]);

  const updateSettings = useCallback((partial: Partial<AppSettings>) => {
    setSettingsState((previous) => ({ ...previous, ...partial }));
  }, []);

  return { settings, updateSettings, BG_OPTIONS };
};
