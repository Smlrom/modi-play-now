import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import modiHappy from "@/assets/modi-rabbit-happy.png";
import { Play, BarChart3, ShoppingBag, Settings } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSound } from "@/hooks/useSound";
import { useSettings } from "@/hooks/useSettings";
import { useProgress } from "@/hooks/useProgress";
import { getSkinById } from "@/data/skins";
import SplashScreen from "@/components/SplashScreen";

const Index = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { playClick, setEnabled } = useSound();
  const { settings } = useSettings();
  const { progress } = useProgress();
  setEnabled(settings.soundEnabled);
  const selectedSkin = getSkinById(progress.selectedSkin);

  const [showSplash, setShowSplash] = useState(() => {
    try {
      return !sessionStorage.getItem("modi-splash-seen");
    } catch {
      return false;
    }
  });

  const handleSplashFinish = useCallback(() => {
    try {
      sessionStorage.setItem("modi-splash-seen", "1");
    } catch {
      // The app can still be used if session storage is unavailable.
    }
    setShowSplash(false);
  }, []);

  if (showSplash) return <SplashScreen onFinish={handleSplashFinish} />;

  const menuItems = [
    { label: t("menu.start"), icon: Play, path: "/difficulty", color: "bg-primary text-primary-foreground" },
    { label: t("menu.progress"), icon: BarChart3, path: "/progress", color: "bg-modi-green text-primary-foreground" },
    { label: t("menu.store"), icon: ShoppingBag, path: "/store", color: "bg-modi-orange text-primary-foreground" },
    { label: t("menu.settings"), icon: Settings, path: "/settings", color: "bg-modi-purple text-primary-foreground" },
  ];

  const handleClick = (path: string) => {
    playClick();
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-8">
      <h1 className="font-display text-5xl text-primary tracking-wide mb-2">{t("app.title")}</h1>
      <p className="font-body text-muted-foreground text-base font-semibold mb-6">{t("app.subtitle")}</p>

      <div className="relative mb-8">
        <div className="absolute -inset-4 bg-primary/10 rounded-full blur-2xl" />
        <div className="relative">
          <img src={modiHappy} alt="Modi el conejito" className="relative w-48 h-48 animate-float object-contain" width={512} height={512} />
          {selectedSkin.id !== "classic" && (
            <span className="absolute top-2 right-1 text-5xl drop-shadow-sm" role="img" aria-label={t(`store.${selectedSkin.id}`)}>{selectedSkin.emoji}</span>
          )}
        </div>
      </div>

      <div className="bg-card rounded-2xl px-6 py-4 shadow-lg mb-8 max-w-xs text-center relative">
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-card rotate-45 shadow-sm" />
        <p className="font-body text-foreground text-sm font-semibold">{t("app.greeting", { name: "Modi" })}</p>
        {selectedSkin.id !== "classic" && <p className="font-body text-xs text-muted-foreground mt-1">{t(`store.${selectedSkin.id}`)}</p>}
      </div>

      <div className="w-full max-w-xs flex flex-col gap-3">
        {menuItems.map((item) => (
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
