import { useState, useEffect } from "react";

export interface AppSettings {
  soundEnabled: boolean;
  bgColor: string; // CSS class suffix
}

const STORAGE_KEY = "modi-settings";

const BG_OPTIONS = [
  { id: "default", label: "Azul cielo", css: "210 50% 96%" },
  { id: "green", label: "Verde menta", css: "150 40% 94%" },
  { id: "pink", label: "Rosa pastel", css: "340 40% 95%" },
  { id: "yellow", label: "Amarillo suave", css: "45 50% 95%" },
  { id: "purple", label: "Lavanda", css: "270 40% 95%" },
];

const loadSettings = (): AppSettings => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { soundEnabled: true, bgColor: "default" };
};

export const useSettings = () => {
  const [settings, setSettingsState] = useState<AppSettings>(loadSettings);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    // Apply bg color
    const opt = BG_OPTIONS.find((o) => o.id === settings.bgColor) || BG_OPTIONS[0];
    document.documentElement.style.setProperty("--background", opt.css);
  }, [settings]);

  const updateSettings = (partial: Partial<AppSettings>) => {
    setSettingsState((prev) => ({ ...prev, ...partial }));
  };

  return { settings, updateSettings, BG_OPTIONS };
};
