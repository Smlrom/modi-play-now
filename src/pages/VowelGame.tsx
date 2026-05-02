import { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import VictoryModal from "@/components/VictoryModal";
import DefeatModal from "@/components/DefeatModal";
import modiHappy from "@/assets/modi-rabbit-happy.png";
import { ArrowLeft, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSound } from "@/hooks/useSound";
import { useProgress } from "@/hooks/useProgress";
import { useSettings } from "@/hooks/useSettings";

const VOWELS = ["A", "E", "I", "O", "U"];

interface Question {
  promptKey: string;
  promptParams?: Record<string, string>;
  image: string;
  correct: string;
  options: string[];
}

const QUESTIONS: Question[] = [
  { promptKey: "game.which_vowel", image: "🍎", correct: "A", options: ["A", "E", "O", "U"] },
  { promptKey: "game.starts_with", promptParams: { word: "Elefante" }, image: "🐘", correct: "E", options: ["I", "E", "A", "O"] },
  { promptKey: "game.starts_with", promptParams: { word: "Iguana" }, image: "🦎", correct: "I", options: ["U", "O", "I", "A"] },
  { promptKey: "game.starts_with", promptParams: { word: "Oso" }, image: "🐻", correct: "O", options: ["E", "O", "U", "I"] },
  { promptKey: "game.starts_with", promptParams: { word: "Uva" }, image: "🍇", correct: "U", options: ["A", "I", "O", "U"] },
];

const VowelGame = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { playCorrect, playWrong, playVictory, playDefeat, playClick, setEnabled } = useSound();
  const { addRecord, addClick } = useProgress();
  const { settings } = useSettings();
  setEnabled(settings.soundEnabled);

  const [currentQ, setCurrentQ] = useState(0);
  const [errors, setErrors] = useState(0);
  const [showVictory, setShowVictory] = useState(false);
  const [showDefeat, setShowDefeat] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean | null>(null);
  const clickCount = useRef(0);

  const question = QUESTIONS[currentQ];
  const lives = 3 - errors;

  const handleAnswer = useCallback((answer: string) => {
    clickCount.current++;
    addClick();
    setSelectedAnswer(answer);
    if (answer === question.correct) {
      playCorrect();
      setIsCorrectAnswer(true);
      setTimeout(() => {
        if (currentQ >= QUESTIONS.length - 1) {
          playVictory();
          addRecord({ levelId: 1, levelName: "Vocales", result: "victory", clicks: clickCount.current });
          setShowVictory(true);
        } else {
          setCurrentQ(prev => prev + 1);
          setSelectedAnswer(null);
          setIsCorrectAnswer(null);
        }
      }, 800);
    } else {
      playWrong();
      setIsCorrectAnswer(false);
      const newErrors = errors + 1;
      setErrors(newErrors);
      if (newErrors >= 3) {
        setTimeout(() => {
          playDefeat();
          addRecord({ levelId: 1, levelName: "Vocales", result: "defeat", clicks: clickCount.current });
          setShowDefeat(true);
        }, 600);
      } else {
        setTimeout(() => {
          setSelectedAnswer(null);
          setIsCorrectAnswer(null);
        }, 800);
      }
    }
  }, [currentQ, errors, question.correct, playCorrect, playWrong, playVictory, playDefeat, addRecord, addClick]);

  const handleRetry = () => {
    clickCount.current = 0;
    setCurrentQ(0);
    setErrors(0);
    setShowDefeat(false);
    setSelectedAnswer(null);
    setIsCorrectAnswer(null);
  };

  const getOptionStyle = (option: string) => {
    if (selectedAnswer === null) return "bg-card border-2 border-border shadow-md hover:shadow-lg hover:scale-105";
    if (option === question.correct) return "bg-success/20 border-2 border-success scale-105";
    if (option === selectedAnswer && !isCorrectAnswer) return "bg-destructive/20 border-2 border-destructive animate-shake";
    return "bg-card border-2 border-border opacity-50";
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex items-center justify-between p-4">
        <button onClick={() => navigate("/levels")} className="p-2 rounded-xl bg-card shadow-md">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <div className="flex gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <Heart key={i} className={`w-7 h-7 ${i < lives ? "text-secondary fill-secondary" : "text-muted"}`} />
          ))}
        </div>
        <div className="font-display text-sm text-muted-foreground">{currentQ + 1}/{QUESTIONS.length}</div>
      </div>

      <div className="mx-4 h-3 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${((currentQ) / QUESTIONS.length) * 100}%` }} />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6">
        <div className="text-7xl mb-4">{question.image}</div>
        <h2 className="font-display text-xl text-foreground text-center mb-2">
          {t(question.promptKey, question.promptParams)}
        </h2>

        <div className="flex gap-3 my-4">
          {VOWELS.map((v) => (
            <span key={v} className="font-display text-2xl text-primary">{v}</span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 w-full max-w-xs mt-4">
          {question.options.map((option) => (
            <button
              key={option}
              onClick={() => { if (selectedAnswer === null) { playClick(); handleAnswer(option); } }}
              disabled={selectedAnswer !== null}
              className={`${getOptionStyle(option)} rounded-2xl py-5 font-display text-3xl text-foreground transition-all duration-300`}
            >
              {option}
            </button>
          ))}
        </div>

        <img src={modiHappy} alt="Modi" className="w-20 h-20 mt-6 animate-float" width={512} height={512} loading="lazy" />
      </div>

      {showVictory && <VictoryModal onContinue={() => navigate("/levels")} />}
      {showDefeat && <DefeatModal onRetry={handleRetry} />}
    </div>
  );
};

export default VowelGame;
