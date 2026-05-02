import { useState, useEffect } from "react";
import modiHappy from "@/assets/modi-rabbit-happy.png";

const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onFinish, 400);
          return 100;
        }
        return p + 2;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <h1 className="font-display text-5xl text-primary mb-8">Modi</h1>

      {/* Track */}
      <div className="relative w-full max-w-xs h-32 mb-6">
        {/* Finish flag */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-4xl">🏁</div>
        
        {/* Track line */}
        <div className="absolute bottom-6 left-0 right-0 h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Modi running */}
        <div
          className="absolute bottom-4 transition-all duration-100"
          style={{ left: `calc(${Math.min(progress, 92)}% - 24px)` }}
        >
          <img
            src={modiHappy}
            alt="Modi corriendo"
            className="w-16 h-16"
            style={{
              animation: "modi-bounce 0.3s ease-in-out infinite",
              transform: progress >= 100 ? "scale(1.2)" : undefined,
            }}
          />
        </div>

        {/* Dust particles */}
        {progress < 95 && (
          <div
            className="absolute bottom-6 opacity-40"
            style={{ left: `calc(${Math.max(0, progress - 8)}% - 10px)` }}
          >
            <span className="text-xs text-muted-foreground">💨</span>
          </div>
        )}
      </div>

      <p className="font-body text-muted-foreground text-sm font-semibold animate-pulse">
        {progress < 100 ? "Cargando..." : "¡Listo!"}
      </p>

      <style>{`
        @keyframes modi-bounce {
          0%, 100% { transform: translateY(0) rotate(-5deg); }
          50% { transform: translateY(-8px) rotate(5deg); }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
