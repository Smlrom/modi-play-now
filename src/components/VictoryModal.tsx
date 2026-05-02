import modiVictory from "@/assets/modi-rabbit-victory.png";
import Fireworks from "./Fireworks";

interface VictoryModalProps {
  onContinue: () => void;
}

const VictoryModal = ({ onContinue }: VictoryModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40">
      <Fireworks />
      <div className="relative z-20 bg-card rounded-3xl p-8 mx-4 max-w-sm w-full text-center shadow-2xl animate-bounce-in">
        <img
          src={modiVictory}
          alt="Modi celebrando"
          className="w-40 h-40 mx-auto animate-float"
          width={512}
          height={512}
        />
        <h2 className="font-display text-3xl text-success mt-4">¡Excelente!</h2>
        <p className="font-body text-muted-foreground mt-2 text-lg font-semibold">
          ¡Lo lograste! 🎉
        </p>
        <button
          onClick={onContinue}
          className="mt-6 bg-success text-success-foreground font-display text-xl px-8 py-3 rounded-2xl shadow-lg hover:scale-105 transition-transform"
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default VictoryModal;
