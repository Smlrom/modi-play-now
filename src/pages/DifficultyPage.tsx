import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, GraduationCap, Flame, Zap } from "lucide-react";
import modiHappy from "@/assets/modi-rabbit-happy.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSound } from "@/hooks/useSound";
import { useSettings } from "@/hooks/useSettings";

const DifficultyPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { playClick, setEnabled } = useSound();
  const { settings } = useSettings();
  setEnabled(settings.soundEnabled);

  const difficulties = [
    { key: "basic", icon: BookOpen, color: "from-primary to-primary/70", label: t("difficulty.basic"), desc: t("difficulty.basic_desc") },
    { key: "normal", icon: GraduationCap, color: "from-modi-green to-modi-green/70", label: t("difficulty.normal"), desc: t("difficulty.normal_desc") },
    { key: "advanced", icon: Flame, color: "from-modi-orange to-modi-orange/70", label: t("difficulty.advanced"), desc: t("difficulty.advanced_desc") },
    { key: "difficult", icon: Zap, color: "from-modi-purple to-modi-purple/70", label: t("difficulty.difficult"), desc: t("difficulty.difficult_desc") },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex items-center gap-3 p-4">
        <button onClick={() => { playClick(); navigate("/"); }} className="p-2 rounded-xl bg-card shadow-md">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="font-display text-2xl text-foreground">{t("menu.start")}</h1>
      </div>

      <div className="flex items-center gap-3 px-4 mb-6">
        <img src={modiHappy} alt="Modi" className="w-14 h-14 animate-float" />
        <div className="bg-card rounded-2xl p-3 shadow-md flex-1">
          <p className="font-body text-sm text-foreground font-semibold">{t("difficulty.hint")}</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 px-4 pb-8">
        {difficulties.map((d) => (
          <button
            key={d.key}
            onClick={() => { playClick(); navigate(`/levels/${d.key}`); }}
            className={`bg-gradient-to-r ${d.color} rounded-2xl p-5 flex items-center gap-4 shadow-lg hover:scale-[1.02] transition-transform`}
          >
            <div className="bg-white/20 rounded-xl p-3">
              <d.icon className="w-8 h-8 text-primary-foreground" />
            </div>
            <div className="text-left">
              <span className="font-display text-xl text-primary-foreground block">{d.label}</span>
              <span className="font-body text-xs text-primary-foreground/80">{d.desc}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DifficultyPage;
