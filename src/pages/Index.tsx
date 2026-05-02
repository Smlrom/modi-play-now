import { useNavigate } from "react-router-dom";
import modiHappy from "@/assets/modi-rabbit-happy.png";
import { Play, BarChart3, ShoppingBag, Settings, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSound } from "@/hooks/useSound";
import { useSettings } from "@/hooks/useSettings";

const Index = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { playClick, setEnabled } = useSound();
  const { settings } = useSettings();
  setEnabled(settings.soundEnabled);

  const MENU_ITEMS = [
    { label: t("menu.start"), icon: Play, path: "/levels", color: "bg-primary text-primary-foreground" },
    { label: t("menu.progress"), icon: BarChart3, path: "/progress", color: "bg-modi-green text-primary-foreground" },
    { label: t("menu.store"), icon: ShoppingBag, path: "#", color: "bg-modi-orange text-primary-foreground" },
    { label: t("menu.settings"), icon: Settings, path: "/settings", color: "bg-modi-purple text-primary-foreground" },
    { label: t("menu.language"), icon: Globe, path: "/settings", color: "bg-secondary text-secondary-foreground" },
  ];

  const handleClick = (path: string) => {
    playClick();
    if (path !== "#") navigate(path);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-8">
      <h1 className="font-display text-5xl text-primary tracking-wide mb-2">{t("app.title")}</h1>
      <p className="font-body text-muted-foreground text-base font-semibold mb-6">{t("app.subtitle")}</p>

      <div className="relative mb-8">
        <div className="absolute -inset-4 bg-primary/10 rounded-full blur-2xl" />
        <img src={modiHappy} alt="Modi el conejito" className="relative w-48 h-48 animate-float" width={512} height={512} />
      </div>

      <div className="bg-card rounded-2xl px-6 py-4 shadow-lg mb-8 max-w-xs text-center relative">
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-card rotate-45 shadow-sm" />
        <p className="font-body text-foreground text-sm font-semibold">
          {t("app.greeting", { name: "Modi" })}
        </p>
      </div>

      <div className="w-full max-w-xs flex flex-col gap-3">
        {MENU_ITEMS.map((item) => (
          <button
            key={item.label}
            onClick={() => handleClick(item.path)}
            className={`${item.color} rounded-2xl py-4 px-6 font-display text-lg flex items-center gap-4 shadow-lg hover:scale-[1.03] transition-transform duration-200`}
          >
            <item.icon className="w-6 h-6" />
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Index;
