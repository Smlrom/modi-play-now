export interface ModiSkin {
  id: string;
  emoji: string;
  label: string;
  unlockAt: number;
}

export const MODI_SKINS: ModiSkin[] = [
  { id: "classic", emoji: "🐰", label: "Modi clásico", unlockAt: 0 },
  { id: "farmer", emoji: "🌾", label: "Granjero", unlockAt: 4 },
  { id: "astronaut", emoji: "🚀", label: "Astronauta", unlockAt: 8 },
  { id: "robot", emoji: "🤖", label: "Robot", unlockAt: 12 },
  { id: "blocks", emoji: "🧱", label: "Bloques", unlockAt: 16 },
];

export const getSkinById = (id: string): ModiSkin =>
  MODI_SKINS.find((skin) => skin.id === id) ?? MODI_SKINS[0];

export const isSkinUnlocked = (skin: ModiSkin, completedLevels: number): boolean =>
  completedLevels >= skin.unlockAt;
