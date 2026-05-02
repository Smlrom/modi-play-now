import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Lock, Star, CheckCircle } from "lucide-react";
import ComingSoonModal from "@/components/ComingSoonModal";
import modiHappy from "@/assets/modi-rabbit-happy.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSound } from "@/hooks/useSound";
import { useSettings } from "@/hooks/useSettings";
import { useProgress } from "@/hooks/useProgress";
import { isLevelUnlocked, getLevelGlobalId } from "@/data/levels";

interface LevelDef {
  id: number;
  nameKey: string;
}

const BASIC_LEVELS: LevelDef[] = [
  { id: 1, nameKey: "levels.vowels1" },
  { id: 2, nameKey: "levels.vowels2" },
  { id: 3, nameKey: "levels.vowels3" },
  { id: 4, nameKey: "levels.abc1" },
  { id: 5, nameKey: "levels.abc2" },
  { id: 6, nameKey: "levels.abc3" },
  { id: 7, nameKey: "levels.num1" },
  { id: 8, nameKey: "levels.num2" },
  { id: 9, nameKey: "levels.num3" },
];

const GENERIC_LEVELS: LevelDef[] = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  nameKey: `levels.level`,
}));

const LEVEL_COLORS = [
  "from-primary to-primary/80",
  "from-secondary to-secondary/80",
  "from-modi-green to-modi-green/80",
  "from-modi-orange to-modi-orange/80",
  "from-modi-purple to-modi-purple/80",
  "from-primary to-primary/80",
  "from-secondary to-secondary/80",
  "from-modi-green to-modi-green/80",
  "from-modi-orange to-modi-orange/80",
];

const DIFF_TITLES: Record<string, string> = {
  basic: "difficulty.basic",
  normal: "difficulty.normal",
  advanced: "difficulty.advanced",
  difficult: "difficulty.difficult",
};

const LevelsPage = () => {
  const navigate = useNavigate();
  const { difficulty } = useParams<{ difficulty: string }>();
  const diff = difficulty || "basic";
  const [showComingSoon, setShowComingSoon] = useState(false);
  const { t } = useLanguage();
  const { playClick, setEnabled } = useSound();
  const { settings } = useSettings();
  const { progress } = useProgress();
  setEnabled(settings.soundEnabled);

  const levels = diff === "basic" ? BASIC_LEVELS : GENERIC_LEVELS;

  const handleLevelClick = (level: LevelDef) => {
    playClick();
    const unlocked = isLevelUnlocked(diff, level.id, progress.levelsCompleted);
    if (unlocked) {
      navigate(`/game/${diff}/${level.id}`);
    } else {
      setShowComingSoon(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex items-center gap-3 p-4">
        <button onClick={() => { playClick(); navigate("/difficulty"); }} className="p-2 rounded-xl bg-card shadow-md">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="font-display text-2xl text-foreground">{t(DIFF_TITLES[diff] || "levels.title")}</h1>
      </div>

      <div className="flex items-center gap-3 px-4 mb-4">
        <img src={modiHappy} alt="Modi" className="w-14 h-14" loading="lazy" />
        <div className="bg-card rounded-2xl p-3 shadow-md flex-1">
          <p className="font-body text-sm text-foreground font-semibold">{t("levels.hint")}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 px-4 pb-8">
        {levels.map((level, i) => {
          const unlocked = isLevelUnlocked(diff, level.id, progress.levelsCompleted);
          const globalId = getLevelGlobalId(diff, level.id);
          const completed = progress.levelsCompleted.includes(globalId);

          return (
            <button
              key={level.id}
              onClick={() => handleLevelClick(level)}
              className={`relative aspect-square rounded-2xl flex flex-col items-center justify-center shadow-lg transition-all duration-300 ${
                unlocked
                  ? `bg-gradient-to-br ${LEVEL_COLORS[i]} hover:scale-105`
                  : "bg-muted"
              }`}
            >
              {unlocked ? (
                <>
                  <span className="font-display text-2xl text-primary-foreground">{level.id}</span>
                  <span className="font-body text-[10px] text-primary-foreground/80 font-semibold mt-1 leading-tight text-center px-1">
                    {level.nameKey === "levels.level" ? `${t("levels.level")} ${level.id}` : t(level.nameKey)}
                  </span>
                  {completed ? (
                    <CheckCircle className="w-4 h-4 text-accent mt-1" />
                  ) : (
                    <div className="flex gap-0.5 mt-1">
                      {[1, 2, 3].map((s) => (
                        <Star key={s} className="w-3 h-3 text-accent fill-accent/30" />
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <Lock className="w-6 h-6 text-muted-foreground" />
                  <span className="font-body text-xs text-muted-foreground font-semibold mt-1">
                    {level.nameKey === "levels.level" ? `${t("levels.level")} ${level.id}` : t(level.nameKey)}
                  </span>
                </>
              )}
            </button>
          );
        })}
      </div>

      {showComingSoon && <ComingSoonModal onClose={() => setShowComingSoon(false)} />}
    </div>
  );
};

export default LevelsPage;
