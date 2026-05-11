import { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import VictoryModal from "@/components/VictoryModal";
import DefeatModal from "@/components/DefeatModal";
import AnswerFeedback from "@/components/AnswerFeedback";
import modiHappy from "@/assets/modi-rabbit-happy.png";
import { ArrowLeft, Heart, Timer } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSound } from "@/hooks/useSound";
import { useProgress } from "@/hooks/useProgress";
import { useSettings } from "@/hooks/useSettings";
import { getQuestionsForLevel, LevelInfo, getLevelInfo } from "@/data/levels";

const GamePage = () => {
  const navigate = useNavigate();
  const { difficulty, levelId } = useParams<{ difficulty: string; levelId: string }>();
  const { t } = useLanguage();
  const { playCorrect, playWrong, playVictory, playDefeat, playClick, setEnabled } = useSound();
  const { addRecord, addClick } = useProgress();
  const { settings } = useSettings();
  setEnabled(settings.soundEnabled);

  const levelNum = parseInt(levelId || "1");
  const levelInfo = getLevelInfo(difficulty || "basic", levelNum);
  const questions = getQuestionsForLevel(difficulty || "basic", levelNum);
  const isTimed = difficulty === "difficult";

  const [currentQ, setCurrentQ] = useState(0);
  const [errors, setErrors] = useState(0);
  const [showVictory, setShowVictory] = useState(false);
  const [showDefeat, setShowDefeat] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean | null>(null);
  const [timeLeft, setTimeLeft] = useState(isTimed ? 40 : -1);
  const clickCount = useRef(0);

  // Timer for difficult mode
  useEffect(() => {
    if (!isTimed || showVictory || showDefeat) return;
    if (timeLeft <= 0 && isTimed) {
      playDefeat();
      const globalId = (difficulty === "difficult" ? 27 : 0) + levelNum;
      addRecord({ levelId: globalId, levelName: `${levelInfo.category} ${levelNum}`, result: "defeat", clicks: clickCount.current });
      setShowDefeat(true);
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isTimed, showVictory, showDefeat]);

  const question = questions[currentQ];
  const lives = 3 - errors;

  const globalLevelId = (() => {
    const diffOffset = { basic: 0, normal: 9, advanced: 18, difficult: 27 };
    return (diffOffset[difficulty as keyof typeof diffOffset] || 0) + levelNum;
  })();

  const handleAnswer = useCallback((answer: string) => {
    clickCount.current++;
    addClick();
    setSelectedAnswer(answer);
    if (answer === question.correct) {
      playCorrect();
      setIsCorrectAnswer(true);
      setTimeout(() => {
        if (currentQ >= questions.length - 1) {
          playVictory();
          addRecord({ levelId: globalLevelId, levelName: `${levelInfo.category} ${levelNum}`, result: "victory", clicks: clickCount.current });
          setShowVictory(true);
        } else {
          setCurrentQ((p) => p + 1);
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
          addRecord({ levelId: globalLevelId, levelName: `${levelInfo.category} ${levelNum}`, result: "defeat", clicks: clickCount.current });
          setShowDefeat(true);
        }, 600);
      } else {
        setTimeout(() => { setSelectedAnswer(null); setIsCorrectAnswer(null); }, 800);
      }
    }
  }, [currentQ, errors, question, questions.length, globalLevelId, levelInfo]);

  const handleRetry = () => {
    clickCount.current = 0;
    setCurrentQ(0);
    setErrors(0);
    setShowDefeat(false);
    setSelectedAnswer(null);
    setIsCorrectAnswer(null);
    if (isTimed) setTimeLeft(40);
  };

  const getOptionStyle = (option: string) => {
    if (selectedAnswer === null) return "bg-card border-2 border-border shadow-md hover:shadow-lg hover:scale-105";
    if (option === question.correct) return "bg-success/20 border-2 border-success scale-105";
    if (option === selectedAnswer && !isCorrectAnswer) return "bg-destructive/20 border-2 border-destructive animate-shake";
    return "bg-card border-2 border-border opacity-50";
  };

  if (!question) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex items-center justify-between p-4">
        <button onClick={() => navigate(`/levels/${difficulty}`)} className="p-2 rounded-xl bg-card shadow-md">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <div className="flex items-center gap-2">
          {isTimed && (
            <div className={`flex items-center gap-1 font-display text-sm ${timeLeft <= 10 ? "text-destructive" : "text-foreground"}`}>
              <Timer className="w-4 h-4" />
              {timeLeft}s
            </div>
          )}
          <div className="flex gap-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <Heart key={i} className={`w-6 h-6 ${i < lives ? "text-secondary fill-secondary" : "text-muted"}`} />
            ))}
          </div>
        </div>
        <div className="font-display text-sm text-muted-foreground">{currentQ + 1}/{questions.length}</div>
      </div>

      <div className="mx-4 h-3 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${(currentQ / questions.length) * 100}%` }} />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6">
        {question.image && <div className="text-7xl mb-4">{question.image}</div>}
        <h2 className="font-display text-lg text-foreground text-center mb-2">{question.prompt}</h2>

        {question.hint && (
          <p className="font-body text-sm text-muted-foreground mb-4">{question.hint}</p>
        )}

        <div className="grid grid-cols-2 gap-4 w-full max-w-xs mt-4">
          {question.options.map((option) => (
            <button
              key={option}
              onClick={() => { if (selectedAnswer === null) { playClick(); handleAnswer(option); } }}
              disabled={selectedAnswer !== null}
              className={`${getOptionStyle(option)} rounded-2xl py-4 font-display text-xl text-foreground transition-all duration-300`}
            >
              {option}
            </button>
          ))}
        </div>

        <img src={modiHappy} alt="Modi" className="w-16 h-16 mt-6 animate-float" loading="lazy" />
      </div>

      {selectedAnswer !== null && isCorrectAnswer !== null && !showVictory && !showDefeat && (
        <AnswerFeedback
          type={isCorrectAnswer ? "correct" : "wrong"}
          attemptsLeft={3 - errors}
        />
      )}
      {showVictory && <VictoryModal onContinue={() => navigate(`/levels/${difficulty}`)} />}
      {showDefeat && <DefeatModal onRetry={handleRetry} />}
    </div>
  );
};

export default GamePage;
