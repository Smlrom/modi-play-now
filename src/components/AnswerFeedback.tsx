import { Check, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface AnswerFeedbackProps {
  type: "correct" | "wrong";
  attemptsLeft?: number;
}

const AnswerFeedback = ({ type, attemptsLeft }: AnswerFeedbackProps) => {
  const { t, lang } = useLanguage() as any;

  const correctLabels: Record<string, string> = {
    es: "¡Correcto!",
    en: "Correct!",
    pt: "Correto!",
    fr: "Correct !",
  };
  const wrongLabels: Record<string, string> = {
    es: "¡Incorrecto!",
    en: "Wrong!",
    pt: "Errado!",
    fr: "Faux !",
  };
  const attemptsLabels: Record<string, (n: number) => string> = {
    es: (n) => `Te quedan ${n} ${n === 1 ? "intento" : "intentos"}`,
    en: (n) => `${n} ${n === 1 ? "attempt" : "attempts"} left`,
    pt: (n) => `Restam ${n} ${n === 1 ? "tentativa" : "tentativas"}`,
    fr: (n) => `Il reste ${n} ${n === 1 ? "essai" : "essais"}`,
  };

  const l = (lang as string) in correctLabels ? (lang as string) : "es";
  const isCorrect = type === "correct";

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none animate-fade-in"
      aria-live="polite"
    >
      <div
        className={`absolute inset-0 ${isCorrect ? "bg-success/25" : "bg-destructive/25"} animate-fade-in`}
      />
      <div
        className={`relative z-10 px-8 py-5 rounded-3xl shadow-2xl flex flex-col items-center gap-2 animate-bounce-in ${
          isCorrect ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground"
        }`}
      >
        <div className="flex items-center gap-2">
          {isCorrect ? <Check className="w-8 h-8" /> : <X className="w-8 h-8 animate-shake" />}
          <span className="font-display text-2xl">
            {isCorrect ? correctLabels[l] : wrongLabels[l]}
          </span>
        </div>
        {!isCorrect && typeof attemptsLeft === "number" && attemptsLeft > 0 && (
          <span className="font-body text-sm opacity-90">{attemptsLabels[l](attemptsLeft)}</span>
        )}
      </div>
    </div>
  );
};

export default AnswerFeedback;
