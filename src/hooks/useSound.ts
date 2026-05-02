import { useCallback, useRef } from "react";

const audioCtxRef = { current: null as AudioContext | null };

const getCtx = () => {
  if (!audioCtxRef.current) audioCtxRef.current = new AudioContext();
  return audioCtxRef.current;
};

const playTone = (freq: number, duration: number, type: OscillatorType = "sine", volume = 0.3) => {
  try {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.value = volume;
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {}
};

export const useSound = () => {
  const enabled = useRef(true);

  const setEnabled = (v: boolean) => { enabled.current = v; };

  const playCorrect = useCallback(() => {
    if (!enabled.current) return;
    playTone(523, 0.15, "sine", 0.25);
    setTimeout(() => playTone(659, 0.15, "sine", 0.25), 100);
    setTimeout(() => playTone(784, 0.2, "sine", 0.25), 200);
  }, []);

  const playWrong = useCallback(() => {
    if (!enabled.current) return;
    playTone(200, 0.3, "sawtooth", 0.15);
  }, []);

  const playVictory = useCallback(() => {
    if (!enabled.current) return;
    const notes = [523, 587, 659, 784, 880, 1047];
    notes.forEach((n, i) => setTimeout(() => playTone(n, 0.2, "sine", 0.2), i * 120));
  }, []);

  const playDefeat = useCallback(() => {
    if (!enabled.current) return;
    playTone(400, 0.3, "triangle", 0.2);
    setTimeout(() => playTone(300, 0.3, "triangle", 0.2), 250);
    setTimeout(() => playTone(200, 0.5, "triangle", 0.2), 500);
  }, []);

  const playClick = useCallback(() => {
    if (!enabled.current) return;
    playTone(800, 0.05, "sine", 0.1);
  }, []);

  return { playCorrect, playWrong, playVictory, playDefeat, playClick, setEnabled };
};
