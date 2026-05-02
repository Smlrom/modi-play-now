import modiSad from "@/assets/modi-rabbit-sad.png";
import { useLanguage } from "@/contexts/LanguageContext";

interface DefeatModalProps {
  onRetry: () => void;
}

const DefeatModal = ({ onRetry }: DefeatModalProps) => {
  const { t } = useLanguage();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40">
      <div className="bg-card rounded-3xl p-8 mx-4 max-w-sm w-full text-center shadow-2xl animate-bounce-in">
        <img src={modiSad} alt="Modi triste" className="w-40 h-40 mx-auto animate-shake" width={512} height={512} />
        <h2 className="font-display text-2xl text-secondary mt-4">{t("defeat.title")}</h2>
        <p className="font-body text-muted-foreground mt-2 text-lg font-semibold">{t("defeat.text")}</p>
        <button
          onClick={onRetry}
          className="mt-6 bg-secondary text-secondary-foreground font-display text-xl px-8 py-3 rounded-2xl shadow-lg hover:scale-105 transition-transform"
        >
          {t("defeat.retry")}
        </button>
      </div>
    </div>
  );
};

export default DefeatModal;
