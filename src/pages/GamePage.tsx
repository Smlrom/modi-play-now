import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import VictoryModal from "@/components/VictoryModal";
import DefeatModal from "@/components/DefeatModal";
import AnswerFeedback from "@/components/AnswerFeedback";
import ModiCharacter from "@/components/ModiCharacter";
import { ArrowLeft, Heart, Timer } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSound } from "@/hooks/useSound";
import { useProgress } from "@/hooks/useProgress";
import { useSettings } from "@/hooks/useSettings";
import { getQuestionsForLevel, getLevelInfo, type GameQuestion } from "@/data/levels";
const DIFFICULTY_TIME_SECONDS = 15;

const GamePage = () => {
  const navigate = useNavigate();
  const { difficulty, levelId } = useParams<{ difficulty: string; levelId: string }>();
  const { t } = useLanguage();
  const { playCorrect, playWrong, playVictory, playDefeat, playClick, setEnabled } = useSound();
  const { addRecord, addClick, progress } = useProgress();
  const { settings } = useSettings();
  setEnabled(settings.soundEnabled);

  const levelNum = Math.max(1, parseInt(levelId || "1", 10) || 1);
  const activeDifficulty = difficulty || "basic";
  const levelInfo = getLevelInfo(activeDifficulty, levelNum);
  // Generate the question set once per level. Previously every timer tick re-shuffled it.
  const [questions, setQuestions] = useState<GameQuestion[]>(() =>
    getQuestionsForLevel(activeDifficulty, levelNum),
  );
  const isTimed = activeDifficulty === "difficult";

  const [currentQ, setCurrentQ] = useState(0);
  const [errors, setErrors] = useState(0);
  const [showVictory, setShowVictory] = useState(false);
  const [showDefeat, setShowDefeat] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean | null>(null);
  const [timeLeft, setTimeLeft] = useState(DIFFICULTY_TIME_SECONDS);
  const clickCount = useRef(0);
  const answerTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const gameEndedRef = useRef(false);

  const globalLevelId = useMemo(() => {
    const offsets: Record<string, number> = { basic: 0, normal: 9, advanced: 18, difficult: 27 };
    return (offsets[activeDifficulty] ?? 0) + levelNum;
  }, [activeDifficulty, levelNum]);

  const clearAnswerTimeout = useCallback(() => {
    if (answerTimeoutRef.current !== null) {
      clearTimeout(answerTimeoutRef.current);
      answerTimeoutRef.current = null;
    }
  }, []);

  const finishDefeat = useCallback(() => {
    if (gameEndedRef.current) return;
    gameEndedRef.current = true;
    clearAnswerTimeout();
    playDefeat();
    addRecord({
      levelId: globalLevelId,
      levelName: `${levelInfo.category} ${levelNum}`,
      result: "defeat",
      clicks: clickCount.current,
    });
    setShowDefeat(true);
  }, [addRecord, clearAnswerTimeout, globalLevelId, levelInfo.category, levelNum, playDefeat]);

  // One stable interval; it does not restart on every second.
  useEffect(() => {
    if (!isTimed || showVictory || showDefeat || selectedAnswer !== null || gameEndedRef.current) return;
    const timer = setInterval(() => setTimeLeft((remaining) => Math.max(0, remaining - 1)), 1000);
    return () => clearInterval(timer);
  }, [isTimed, selectedAnswer, showVictory, showDefeat]);

  useEffect(() => {
    if (isTimed && timeLeft === 0 && !showVictory && !showDefeat) finishDefeat();
  }, [finishDefeat, isTimed, showDefeat, showVictory, timeLeft]);

  useEffect(() => () => clearAnswerTimeout(), [clearAnswerTimeout]);

  const question = questions[currentQ];
  const lives = 3 - errors;

  const handleAnswer = useCallback((answer: string) => {
    if (gameEndedRef.current || selectedAnswer !== null || !question) return;
    clickCount.current += 1;
    addClick();
    setSelectedAnswer(answer);

    if (answer === question.correct) {
      playCorrect();
      setIsCorrectAnswer(true);
      clearAnswerTimeout();
      answerTimeoutRef.current = setTimeout(() => {
        answerTimeoutRef.current = null;
        if (gameEndedRef.current) return;
        if (currentQ >= questions.length - 1) {
          gameEndedRef.current = true;
          playVictory();
          addRecord({
            levelId: globalLevelId,
            levelName: `${levelInfo.category} ${levelNum}`,
            result: "victory",
            clicks: clickCount.current,
          });
          setShowVictory(true);
        } else {
          setCurrentQ((previous) => previous + 1);
          setSelectedAnswer(null);
          setIsCorrectAnswer(null);
        }
      }, 800);
    } else {
      playWrong();
      setIsCorrectAnswer(false);
      const newErrors = errors + 1;
      setErrors(newErrors);
      clearAnswerTimeout();
      if (newErrors >= 3) {
        answerTimeoutRef.current = setTimeout(() => {
          answerTimeoutRef.current = null;
          finishDefeat();
        }, 600);
      } else {
        answerTimeoutRef.current = setTimeout(() => {
          answerTimeoutRef.current = null;
          if (!gameEndedRef.current) {
            setSelectedAnswer(null);
            setIsCorrectAnswer(null);
          }
        }, 800);
      }
    }
  }, [
    addClick, addRecord, clearAnswerTimeout, currentQ, errors, finishDefeat,
    globalLevelId, levelInfo.category, levelNum, playCorrect, playVictory,
    playWrong, question, questions.length, selectedAnswer,
  ]);

  const handleRetry = useCallback(() => {
    clearAnswerTimeout();
    gameEndedRef.current = false;
    clickCount.current = 0;
    setCurrentQ(0);
    setErrors(0);
    setShowVictory(false);
    setShowDefeat(false);
    setSelectedAnswer(null);
    setIsCorrectAnswer(null);
    setTimeLeft(DIFFICULTY_TIME_SECONDS);
    setQuestions(getQuestionsForLevel(activeDifficulty, levelNum));
  }, [activeDifficulty, clearAnswerTimeout, levelNum]);

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
        <button onClick={() => navigate(`/levels/${activeDifficulty}`)} className="p-2 rounded-xl bg-card shadow-md" aria-label="Volver a niveles">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <div className="flex items-center gap-2">
          {isTimed && (
            <div className={`flex items-center gap-1 font-display text-sm ${timeLeft <= 10 ? "text-destructive" : "text-foreground"}`} aria-live="polite">
              <Timer className="w-4 h-4" />
              {timeLeft}s
            </div>
          )}
          <div className="flex gap-1" aria-label={`${lives} vidas restantes`}>
            {Array.from({ length: 3 }).map((_, i) => (
              <Heart key={i} className={`w-6 h-6 ${i < lives ? "text-secondary fill-secondary" : "text-muted"}`} />
            ))}
          </div>
        </div>
        <div className="font-display text-sm text-muted-foreground">{currentQ + 1}/{questions.length}</div>
      </div>

      <div className="mx-4 h-3 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${((currentQ + (selectedAnswer === question.correct ? 1 : 0)) / questions.length) * 100}%` }} />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6">
        {question.image && <div className="text-7xl mb-4" aria-hidden="true">{question.image}</div>}
        <h2 className="font-display text-lg text-foreground text-center mb-2">{question.prompt}</h2>
        {question.hint && <p className="font-body text-sm text-muted-foreground mb-4">{question.hint}</p>}

        <div className="grid grid-cols-2 gap-4 w-full max-w-xs mt-4">
          {question.options.map((option) => (
            <button
              key={option}
              onClick={() => { if (selectedAnswer === null && !gameEndedRef.current) { playClick(); handleAnswer(option); } }}
              disabled={selectedAnswer !== null || showVictory || showDefeat}
              className={`${getOptionStyle(option)} rounded-2xl py-4 font-display text-xl text-foreground transition-all duration-300`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="relative mt-6">
          <ModiCharacter skinId={progress.selectedSkin} size="small" className="animate-float" />
        </div>
      </div>

      {selectedAnswer !== null && isCorrectAnswer !== null && !showVictory && !showDefeat && (
        <AnswerFeedback type={isCorrectAnswer ? "correct" : "wrong"} attemptsLeft={3 - errors} />
      )}
      {showVictory && <VictoryModal onContinue={() => navigate(`/levels/${activeDifficulty}`)} />}
      {showDefeat && <DefeatModal onRetry={handleRetry} />}
    </div>
  );
};

export default GamePage;
