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
import { getQuestionsForLevel, getLevelInfo, getLevelGlobalId } from "@/data/levels";

const GamePage = () => {
  const navigate = useNavigate();
  const { difficulty: routeDifficulty, levelId } = useParams<{ difficulty: string; levelId: string }>();
  const difficulty = ["basic", "normal", "advanced", "difficult"].includes(routeDifficulty || "")
    ? routeDifficulty!
    : "basic";
  const parsedLevel = Number.parseInt(levelId || "1", 10);
  const levelNum = Number.isFinite(parsedLevel) && parsedLevel > 0 ? parsedLevel : 1;
  const { t } = useLanguage();
  const { playCorrect, playWrong, playVictory, playDefeat, playClick, setEnabled } = useSound();
  const { addRecord, addClick } = useProgress();
  const { settings } = useSettings();

  useEffect(() => {
    setEnabled(settings.soundEnabled);
  }, [settings.soundEnabled, setEnabled]);

  const levelInfo = getLevelInfo(difficulty, levelNum);
  const questions = getQuestionsForLevel(difficulty, levelNum);
  const isTimed = difficulty === "difficult";
  const globalLevelId = getLevelGlobalId(difficulty, levelNum);

  const [currentQ, setCurrentQ] = useState(0);
  const [errors, setErrors] = useState(0);
  const [showVictory, setShowVictory] = useState(false);
  const [showDefeat, setShowDefeat] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean | null>(null);
  const [timeLeft, setTimeLeft] = useState(isTimed ? 40 : -1);

  const clickCount = useRef(0);
  const resultRecorded = useRef(false);
  const answerLocked = useRef(false);
  const timeoutIds = useRef<number[]>([]);

  const clearScheduled = useCallback(() => {
    timeoutIds.current.forEach((id) => window.clearTimeout(id));
    timeoutIds.current = [];
  }, []);

  const schedule = useCallback((callback: () => void, delay: number) => {
    const id = window.setTimeout(() => {
      timeoutIds.current = timeoutIds.current.filter((existing) => existing !== id);
      callback();
    }, delay);
    timeoutIds.current.push(id);
    return id;
  }, []);

  useEffect(() => () => clearScheduled(), [clearScheduled]);

  const recordResult = useCallback((result: "victory" | "defeat") => {
    if (resultRecorded.current) return;
    resultRecorded.current = true;
    addRecord({
      levelId: globalLevelId,
      levelName: levelInfo.name || `${levelInfo.category} ${levelNum}`,
      result,
      clicks: clickCount.current,
    });
  }, [addRecord, globalLevelId, levelInfo.name, levelInfo.category, levelNum]);

  useEffect(() => {
    if (!isTimed || showVictory || showDefeat) return;
    if (timeLeft <= 0) {
      recordResult("defeat");
      setShowDefeat(true);
      playDefeat();
      return;
    }
    const timerId = window.setTimeout(() => setTimeLeft((time) => time - 1), 1000);
    return () => window.clearTimeout(timerId);
  }, [isTimed, timeLeft, showVictory, showDefeat, recordResult, playDefeat]);

  const question = questions[currentQ];
  const lives = Math.max(0, 3 - errors);

  const handleAnswer = useCallback((answer: string) => {
    if (answerLocked.current || resultRecorded.current || !question) return;
    answerLocked.current = true;
    clickCount.current += 1;
    addClick();
    setSelectedAnswer(answer);

    if (answer === question.correct) {
      setIsCorrectAnswer(true);
      playCorrect();
      schedule(() => {
        if (currentQ >= questions.length - 1) {
          recordResult("victory");
          setShowVictory(true);
          playVictory();
        } else {
          setCurrentQ((previous) => previous + 1);
          setSelectedAnswer(null);
          setIsCorrectAnswer(null);
          answerLocked.current = false;
        }
      }, 800);
      return;
    }

    setIsCorrectAnswer(false);
    playWrong();
    const nextErrors = errors + 1;
    setErrors(nextErrors);

    if (nextErrors >= 3) {
      schedule(() => {
        recordResult("defeat");
        setShowDefeat(true);
        playDefeat();
      }, 600);
    } else {
      schedule(() => {
        setSelectedAnswer(null);
        setIsCorrectAnswer(null);
        answerLocked.current = false;
      }, 800);
    }
  }, [question, addClick, playCorrect, playWrong, schedule, currentQ, questions.length, recordResult, playVictory, errors, playDefeat]);

  const handleRetry = useCallback(() => {
    clearScheduled();
    resultRecorded.current = false;
    answerLocked.current = false;
    clickCount.current = 0;
    setCurrentQ(0);
    setErrors(0);
    setShowDefeat(false);
    setShowVictory(false);
    setSelectedAnswer(null);
    setIsCorrectAnswer(null);
    setTimeLeft(isTimed ? 40 : -1);
  }, [clearScheduled, isTimed]);

  const leaveGame = useCallback(() => {
    clearScheduled();
    navigate(`/levels/${difficulty}`);
  }, [clearScheduled, navigate, difficulty]);

  const getOptionStyle = (option: string) => {
    if (selectedAnswer === null) return "bg-card border-2 border-border shadow-md hover:shadow-lg hover:scale-105";
    if (option === question?.correct) return "bg-success/20 border-2 border-success scale-105";
    if (option === selectedAnswer && !isCorrectAnswer) return "bg-destructive/20 border-2 border-destructive animate-shake";
    return "bg-card border-2 border-border opacity-50";
  };

  if (!question) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 p-6 text-center">
        <p className="font-display text-xl text-foreground">No hay preguntas disponibles para este nivel.</p>
        <button onClick={leaveGame} className="rounded-xl bg-primary px-5 py-3 font-bold text-primary-foreground">Volver a niveles</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex items-center justify-between gap-2 p-4">
        <button aria-label="Salir de la partida" onClick={() => { playClick(); leaveGame(); }} className="p-2 rounded-xl bg-card shadow-md">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <div className="flex items-center gap-2">
          {isTimed && (
            <div role="timer" aria-live="off" className={`flex items-center gap-1 font-display text-sm ${timeLeft <= 10 ? "text-destructive" : "text-foreground"}`}>
              <Timer className="w-4 h-4" />
              {timeLeft}s
            </div>
          )}
          <div aria-label={`${lives} vidas restantes`} className="flex gap-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <Heart key={i} className={`w-6 h-6 ${i < lives ? "text-secondary fill-secondary" : "text-muted"}`} />
            ))}
          </div>
        </div>
        <div className="font-display text-sm text-muted-foreground">{currentQ + 1}/{questions.length}</div>
      </div>

      <div className="mx-4 h-3 bg-muted rounded-full overflow-hidden" role="progressbar" aria-valuemin={0} aria-valuemax={questions.length} aria-valuenow={currentQ}>
        <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${((currentQ + (selectedAnswer === question.correct ? 1 : 0)) / questions.length) * 100}%` }} />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6">
        {question.image && <div aria-hidden="true" className="text-7xl mb-4">{question.image}</div>}
        <h2 className="font-display text-lg text-foreground text-center mb-2">{question.prompt}</h2>
        {question.hint && <p className="font-body text-sm text-muted-foreground mb-4">{question.hint}</p>}

        <div className="grid grid-cols-2 gap-4 w-full max-w-xs mt-4">
          {question.options.map((option) => (
            <button
              key={option}
              onClick={() => { playClick(); handleAnswer(option); }}
              disabled={selectedAnswer !== null || showVictory || showDefeat}
              aria-pressed={selectedAnswer === option}
              className={`${getOptionStyle(option)} rounded-2xl py-4 font-display text-xl text-foreground transition-all duration-300 disabled:cursor-not-allowed`}
            >
              {option}
            </button>
          ))}
        </div>
        <img src={modiHappy} alt="Modi" className="w-16 h-16 mt-6 animate-float" loading="lazy" />
      </div>

      {selectedAnswer !== null && isCorrectAnswer !== null && !showVictory && !showDefeat && (
        <AnswerFeedback type={isCorrectAnswer ? "correct" : "wrong"} attemptsLeft={lives} />
      )}
      {showVictory && <VictoryModal onContinue={leaveGame} />}
      {showDefeat && <DefeatModal onRetry={handleRetry} />}
    </div>
  );
};

export default GamePage;
