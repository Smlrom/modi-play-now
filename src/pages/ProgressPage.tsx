import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trophy, XCircle, MousePointerClick, Calendar } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import { useLanguage } from "@/contexts/LanguageContext";
import modiHappy from "@/assets/modi-rabbit-happy.png";

const ProgressPage = () => {
  const navigate = useNavigate();
  const { progress } = useProgress();
  const { t } = useLanguage();

  const victories = progress.records.filter((r) => r.result === "victory").length;
  const defeats = progress.records.filter((r) => r.result === "defeat").length;

  return (
    <div className="min-h-screen bg-background">
      <div className="flex items-center gap-3 p-4">
        <button onClick={() => navigate("/")} className="p-2 rounded-xl bg-card shadow-md">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="font-display text-2xl text-foreground">{t("progress.title")}</h1>
      </div>

      <div className="px-4 space-y-4">
        {/* Stats cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-card rounded-2xl p-4 text-center shadow-md">
            <Trophy className="w-8 h-8 text-accent mx-auto mb-1" />
            <p className="font-display text-2xl text-foreground">{progress.levelsCompleted.length}</p>
            <p className="font-body text-xs text-muted-foreground font-semibold">{t("progress.levels_completed")}</p>
          </div>
          <div className="bg-card rounded-2xl p-4 text-center shadow-md">
            <XCircle className="w-8 h-8 text-secondary mx-auto mb-1" />
            <p className="font-display text-2xl text-foreground">{defeats}</p>
            <p className="font-body text-xs text-muted-foreground font-semibold">{t("progress.total_failures")}</p>
          </div>
          <div className="bg-card rounded-2xl p-4 text-center shadow-md">
            <MousePointerClick className="w-8 h-8 text-primary mx-auto mb-1" />
            <p className="font-display text-2xl text-foreground">{progress.totalClicks}</p>
            <p className="font-body text-xs text-muted-foreground font-semibold">{t("progress.total_clicks")}</p>
          </div>
        </div>

        {/* Modi */}
        <div className="flex justify-center">
          <img src={modiHappy} alt="Modi" className="w-20 h-20 animate-float" width={512} height={512} loading="lazy" />
        </div>

        {/* History */}
        <h2 className="font-display text-lg text-foreground">{t("progress.history")}</h2>
        {progress.records.length === 0 ? (
          <p className="font-body text-muted-foreground text-center py-8 font-semibold">{t("progress.no_data")}</p>
        ) : (
          <div className="space-y-2 pb-8">
            {[...progress.records].reverse().map((rec, i) => (
              <div key={i} className="bg-card rounded-xl p-3 shadow-sm flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${rec.result === "victory" ? "bg-success/20" : "bg-secondary/20"}`}>
                  {rec.result === "victory" ? "🏆" : "💔"}
                </div>
                <div className="flex-1">
                  <p className="font-body text-sm text-foreground font-bold">{rec.levelName}</p>
                  <p className="font-body text-xs text-muted-foreground">
                    {rec.result === "victory" ? t("progress.victory") : t("progress.defeat")} · {rec.clicks} clicks
                  </p>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  <span className="font-body text-xs">{new Date(rec.date).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressPage;
