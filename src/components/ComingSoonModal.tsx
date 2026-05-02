import modiHappy from "@/assets/modi-rabbit-happy.png";
import { useLanguage } from "@/contexts/LanguageContext";

interface ComingSoonModalProps {
  onClose: () => void;
}

const ComingSoonModal = ({ onClose }: ComingSoonModalProps) => {
  const { t } = useLanguage();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40">
      <div className="bg-card rounded-3xl p-8 mx-4 max-w-sm w-full text-center shadow-2xl animate-bounce-in">
        <img src={modiHappy} alt="Modi" className="w-32 h-32 mx-auto" width={512} height={512} />
        <h2 className="font-display text-2xl text-modi-purple mt-4">{t("coming_soon.title")}</h2>
        <p className="font-body text-muted-foreground mt-2 text-base font-semibold">{t("coming_soon.text")}</p>
        <button
          onClick={onClose}
          className="mt-6 bg-modi-purple text-primary-foreground font-display text-lg px-8 py-3 rounded-2xl shadow-lg hover:scale-105 transition-transform"
        >
          {t("coming_soon.ok")}
        </button>
      </div>
    </div>
  );
};

export default ComingSoonModal;
