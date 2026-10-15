import { useCallback, useRef } from "react";

let audioContext: AudioContext | null = null;

const getCtx = (): AudioContext | null => {
  try {
    if (typeof window === "undefined") return null;
    const AudioContextConstructor = window.AudioContext;
    if (!AudioContextConstructor) return null;
    if (!audioContext || audioContext.state === "closed") {
      audioContext = new AudioContextConstructor();
    }
    if (audioContext.state === "suspended") void audioContext.resume().catch(() => undefined);
    return audioContext;
  } catch {
    return null;
  }
};

const playTone = (freq: number, duration: number, type: OscillatorType = "sine", volume = 0.3) => {
  const ctx = getCtx();
  if (!ctx) return;
  try {
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = type;
    oscillator.frequency.value = freq;
    gain.gain.setValueAtTime(Math.max(0.001, volume), ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start();
    oscillator.stop(ctx.currentTime + duration);
    oscillator.onended = () => {
      oscillator.disconnect();
      gain.disconnect();
    };
  } catch {
    // Audio is an optional enhancement; gameplay must not fail without it.
  }
};

export const useSound = () => {
  const enabled = useRef(true);
  const setEnabled = useCallback((value: boolean) => {
    enabled.current = value;
  }, []);

  const playCorrect = useCallback(() => {
    if (!enabled.current) return;
    playTone(523, 0.15, "sine", 0.25);
    window.setTimeout(() => { if (enabled.current) playTone(659, 0.15, "sine", 0.25); }, 100);
    window.setTimeout(() => { if (enabled.current) playTone(784, 0.2, "sine", 0.25); }, 200);
  }, []);

  const playWrong = useCallback(() => {
    if (enabled.current) playTone(200, 0.3, "sawtooth", 0.15);
  }, []);

  const playVictory = useCallback(() => {
    if (!enabled.current) return;
    [523, 587, 659, 784, 880, 1047].forEach((note, index) => {
      window.setTimeout(() => { if (enabled.current) playTone(note, 0.2, "sine", 0.2); }, index * 120);
    });
  }, []);

  const playDefeat = useCallback(() => {
    if (!enabled.current) return;
    playTone(400, 0.3, "triangle", 0.2);
    window.setTimeout(() => { if (enabled.current) playTone(300, 0.3, "triangle", 0.2); }, 250);
    window.setTimeout(() => { if (enabled.current) playTone(200, 0.5, "triangle", 0.2); }, 500);
  }, []);

  const playClick = useCallback(() => {
    if (enabled.current) playTone(800, 0.05, "sine", 0.1);
  }, []);

  return { playCorrect, playWrong, playVictory, playDefeat, playClick, setEnabled };
};
