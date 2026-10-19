import { useNavigate } from "react-router-dom";
import { ArrowLeft, Lock, Check, Shirt } from "lucide-react";
import modiHappy from "@/assets/modi-rabbit-happy.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSound } from "@/hooks/useSound";
import { useSettings } from "@/hooks/useSettings";
import { useProgress } from "@/hooks/useProgress";
import { MODI_SKINS, isSkinUnlocked } from "@/data/skins";

const StorePage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { playClick, setEnabled } = useSound();
  const { settings } = useSettings();
  const { progress, selectSkin } = useProgress();
  setEnabled(settings.soundEnabled);

  const totalCompleted = progress.levelsCompleted.length;
  const activeSkin = MODI_SKINS.find((skin) => skin.id === progress.selectedSkin) ?? MODI_SKINS[0];

  const handleSkinClick = (skinId: string, unlocked: boolean) => {
    playClick();
    if (unlocked) selectSkin(skinId);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex items-center gap-3 p-4">
        <button onClick={() => { playClick(); navigate("/"); }} className="p-2 rounded-xl bg-card shadow-md" aria-label={t("settings.back")}>
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="font-display text-2xl text-foreground">{t("store.title")}</h1>
      </div>

      <div className="flex items-center gap-3 px-4 mb-6">
        <div className="relative shrink-0">
          <img src={modiHappy} alt="Modi" className="w-16 h-16" />
          {activeSkin.id !== "classic" && <span className="absolute -top-2 -right-2 text-2xl" role="img" aria-label={t(`store.${activeSkin.id}`)}>{activeSkin.emoji}</span>}
        </div>
        <div className="bg-card rounded-2xl p-3 shadow-md flex-1">
          <p className="font-body text-sm text-foreground font-semibold">{t("store.hint")}</p>
          <p className="font-body text-xs text-muted-foreground mt-1">{t("store.selected")}: {t(`store.${activeSkin.id}`)}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 px-4 pb-8">
        {MODI_SKINS.map((skin) => {
          const unlocked = isSkinUnlocked(skin, totalCompleted);
          const selected = activeSkin.id === skin.id;
          return (
            <button
              type="button"
              key={skin.id}
              onClick={() => handleSkinClick(skin.id, unlocked)}
              disabled={!unlocked}
              aria-pressed={selected}
              className={`relative rounded-2xl p-5 flex flex-col items-center gap-3 shadow-lg transition-all text-center ${selected ? "bg-primary/10 border-2 border-primary" : unlocked ? "bg-card border-2 border-border hover:border-primary/60" : "bg-muted opacity-80"}`}
            >
              <div className="relative">
                <img src={modiHappy} alt="" className={`w-20 h-20 object-contain ${!unlocked ? "grayscale" : ""}`} />
                {skin.id !== "classic" && <span className="absolute -top-1 -right-2 text-2xl" aria-hidden="true">{skin.emoji}</span>}
              </div>
              <span className="font-display text-base text-foreground">{t(`store.${skin.id}`)}</span>

              {selected ? (
                <div className="flex items-center gap-1 text-primary"><Check className="w-4 h-4" /><span className="font-body text-xs font-semibold">{t("store.selected")}</span></div>
              ) : unlocked ? (
                <div className="flex items-center gap-1 text-success"><Shirt className="w-4 h-4" /><span className="font-body text-xs font-semibold">{t("store.unlocked")}</span></div>
              ) : (
                <div className="flex items-center gap-1 text-muted-foreground"><Lock className="w-4 h-4" /><span className="font-body text-xs font-semibold">{totalCompleted}/{skin.unlockAt} {t("store.levels")}</span></div>
              )}

              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary transition-all duration-300" style={{ width: `${skin.unlockAt === 0 ? 100 : Math.min(100, (totalCompleted / skin.unlockAt) * 100)}%` }} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StorePage;
