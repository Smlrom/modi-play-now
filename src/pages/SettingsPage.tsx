import { useNavigate } from "react-router-dom";
import { ArrowLeft, Volume2, VolumeX, Palette, Globe } from "lucide-react";
import { useLanguage, Lang } from "@/contexts/LanguageContext";
import { useSettings } from "@/hooks/useSettings";
import { Switch } from "@/components/ui/switch";

const LANGS: { id: Lang; flag: string }[] = [
  { id: "es", flag: "🇪🇸" },
  { id: "en", flag: "🇺🇸" },
  { id: "pt", flag: "🇧🇷" },
  { id: "fr", flag: "🇫🇷" },
];

const SettingsPage = () => {
  const navigate = useNavigate();
  const { t, lang, setLang } = useLanguage();
  const { settings, updateSettings, BG_OPTIONS } = useSettings();

  return (
    <div className="min-h-screen bg-background">
      <div className="flex items-center gap-3 p-4">
        <button onClick={() => navigate("/")} className="p-2 rounded-xl bg-card shadow-md">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="font-display text-2xl text-foreground">{t("settings.title")}</h1>
      </div>

      <div className="px-4 space-y-6">
        {/* Sound */}
        <div className="bg-card rounded-2xl p-4 shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {settings.soundEnabled ? (
                <Volume2 className="w-6 h-6 text-primary" />
              ) : (
                <VolumeX className="w-6 h-6 text-muted-foreground" />
              )}
              <span className="font-display text-lg text-foreground">{t("settings.sound")}</span>
            </div>
            <Switch
              checked={settings.soundEnabled}
              onCheckedChange={(v) => updateSettings({ soundEnabled: v })}
            />
          </div>
        </div>

        {/* Background Color */}
        <div className="bg-card rounded-2xl p-4 shadow-md">
          <div className="flex items-center gap-3 mb-3">
            <Palette className="w-6 h-6 text-primary" />
            <span className="font-display text-lg text-foreground">{t("settings.bg_color")}</span>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {BG_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => updateSettings({ bgColor: opt.id })}
                className={`aspect-square rounded-xl border-2 transition-all ${
                  settings.bgColor === opt.id ? "border-primary scale-110 shadow-md" : "border-border"
                }`}
                style={{ backgroundColor: `hsl(${opt.css})` }}
                title={opt.label}
              />
            ))}
          </div>
        </div>

        {/* Language */}
        <div className="bg-card rounded-2xl p-4 shadow-md">
          <div className="flex items-center gap-3 mb-3">
            <Globe className="w-6 h-6 text-primary" />
            <span className="font-display text-lg text-foreground">{t("settings.language")}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {LANGS.map((l) => (
              <button
                key={l.id}
                onClick={() => setLang(l.id)}
                className={`flex items-center gap-2 rounded-xl p-3 border-2 transition-all font-body font-semibold ${
                  lang === l.id
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border text-muted-foreground hover:border-primary/50"
                }`}
              >
                <span className="text-xl">{l.flag}</span>
                <span className="text-sm">{t(`lang.${l.id}`)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
