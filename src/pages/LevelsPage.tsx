import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Lock, Star } from "lucide-react";
import ComingSoonModal from "@/components/ComingSoonModal";
import modiHappy from "@/assets/modi-rabbit-happy.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSound } from "@/hooks/useSound";
import { useSettings } from "@/hooks/useSettings";

const LEVELS = [
  { id: 1, nameKey: "levels.vowels", unlocked: true },
  { id: 2, name: "Nivel 2", unlocked: false },
  { id: 3, name: "Nivel 3", unlocked: false },
  { id: 4, name: "Nivel 4", unlocked: false },
  { id: 5, name: "Nivel 5", unlocked: false },
  { id: 6, name: "Nivel 6", unlocked: false },
  { id: 7, name: "Nivel 7", unlocked: false },
  { id: 8, name: "Nivel 8", unlocked: false },
  { id: 9, name: "Nivel 9", unlocked: false },
];

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

const LevelsPage = () => {
  const navigate = useNavigate();
  const [showComingSoon, setShowComingSoon] = useState(false);
  const { t } = useLanguage();
  const { playClick, setEnabled } = useSound();
  const { settings } = useSettings();
  setEnabled(settings.soundEnabled);

  const handleLevelClick = (level: typeof LEVELS[0]) => {
    playClick();
    if (level.unlocked) {
      navigate("/game/vowels");
    } else {
      setShowComingSoon(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex items-center gap-3 p-4">
        <button onClick={() => navigate("/")} className="p-2 rounded-xl bg-card shadow-md">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="font-display text-2xl text-foreground">{t("levels.title")}</h1>
      </div>

      <div className="flex items-center gap-3 px-4 mb-4">
        <img src={modiHappy} alt="Modi" className="w-14 h-14" width={512} height={512} loading="lazy" />
        <div className="bg-card rounded-2xl p-3 shadow-md flex-1">
          <p className="font-body text-sm text-foreground font-semibold">{t("levels.hint")}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 px-4 pb-8">
        {LEVELS.map((level, i) => (
          <button
            key={level.id}
            onClick={() => handleLevelClick(level)}
            className={`relative aspect-square rounded-2xl flex flex-col items-center justify-center shadow-lg transition-all duration-300 ${
              level.unlocked
                ? `bg-gradient-to-br ${LEVEL_COLORS[i]} hover:scale-105 animate-pulse-glow`
                : "bg-muted"
            }`}
          >
            {level.unlocked ? (
              <>
                <span className="font-display text-2xl text-primary-foreground">{level.id}</span>
                <span className="font-body text-xs text-primary-foreground/80 font-semibold mt-1">
                  {level.nameKey ? t(level.nameKey) : level.name}
                </span>
                <div className="flex gap-0.5 mt-1">
                  {[1, 2, 3].map((s) => (
                    <Star key={s} className="w-3 h-3 text-accent fill-accent/30" />
                  ))}
                </div>
              </>
            ) : (
              <>
                <Lock className="w-6 h-6 text-muted-foreground" />
                <span className="font-body text-xs text-muted-foreground font-semibold mt-1">{level.name}</span>
              </>
            )}
          </button>
        ))}
      </div>

      {showComingSoon && <ComingSoonModal onClose={() => setShowComingSoon(false)} />}
    </div>
  );
};

export default LevelsPage;
