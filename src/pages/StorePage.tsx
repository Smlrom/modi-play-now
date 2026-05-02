import { useNavigate } from "react-router-dom";
import { ArrowLeft, Lock, Check } from "lucide-react";
import modiHappy from "@/assets/modi-rabbit-happy.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSound } from "@/hooks/useSound";
import { useSettings } from "@/hooks/useSettings";
import { useProgress } from "@/hooks/useProgress";

const COSTUMES = [
  { id: "farmer", emoji: "🌾", unlockAt: 4 },
  { id: "astronaut", emoji: "🚀", unlockAt: 8 },
  { id: "robot", emoji: "🤖", unlockAt: 12 },
  { id: "blocks", emoji: "🧱", unlockAt: 16 },
];

const StorePage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { playClick, setEnabled } = useSound();
  const { settings } = useSettings();
  const { progress } = useProgress();
  setEnabled(settings.soundEnabled);

  const totalCompleted = progress.levelsCompleted.length;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex items-center gap-3 p-4">
        <button onClick={() => { playClick(); navigate("/"); }} className="p-2 rounded-xl bg-card shadow-md">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="font-display text-2xl text-foreground">{t("store.title")}</h1>
      </div>

      <div className="flex items-center gap-3 px-4 mb-6">
        <img src={modiHappy} alt="Modi" className="w-14 h-14 animate-float" />
        <div className="bg-card rounded-2xl p-3 shadow-md flex-1">
          <p className="font-body text-sm text-foreground font-semibold">{t("store.hint")}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 px-4 pb-8">
        {COSTUMES.map((costume) => {
          const unlocked = totalCompleted >= costume.unlockAt;
          return (
            <div
              key={costume.id}
              className={`relative rounded-2xl p-6 flex flex-col items-center gap-3 shadow-lg transition-all ${
                unlocked ? "bg-card border-2 border-primary" : "bg-muted"
              }`}
            >
              <div className="text-5xl">{costume.emoji}</div>
              <span className="font-display text-base text-foreground">{t(`store.${costume.id}`)}</span>

              {unlocked ? (
                <div className="flex items-center gap-1 text-success">
                  <Check className="w-4 h-4" />
                  <span className="font-body text-xs font-semibold">{t("store.unlocked")}</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Lock className="w-4 h-4" />
                  <span className="font-body text-xs font-semibold">
                    {totalCompleted}/{costume.unlockAt} {t("store.levels")}
                  </span>
                </div>
              )}

              {/* Progress bar */}
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${Math.min(100, (totalCompleted / costume.unlockAt) * 100)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StorePage;
