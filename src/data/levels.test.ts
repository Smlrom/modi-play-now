import { describe, expect, it } from "vitest";
import {
  getQuestionsForLevel,
  getLevelGlobalId,
  isLevelUnlocked,
} from "./levels";

describe("level progression", () => {
  it("assigns a unique global ID to every difficulty and level", () => {
    const ids = [
      getLevelGlobalId("basic", 1),
      getLevelGlobalId("normal", 1),
      getLevelGlobalId("advanced", 1),
      getLevelGlobalId("difficult", 1),
    ];
    expect(ids).toEqual([1, 10, 19, 28]);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("unlocks the first level and requires the previous level for later levels", () => {
    expect(isLevelUnlocked("basic", 1, [])).toBe(true);
    expect(isLevelUnlocked("basic", 2, [])).toBe(false);
    expect(isLevelUnlocked("basic", 2, [1])).toBe(true);
    expect(isLevelUnlocked("normal", 2, [1])).toBe(false);
    expect(isLevelUnlocked("normal", 2, [10])).toBe(true);
  });

  it.each([
    ["basic", 1],
    ["basic", 4],
    ["basic", 8],
    ["normal", 1],
    ["advanced", 1],
    ["difficult", 1],
  ])("provides playable questions for %s level %s", (difficulty, level) => {
    const questions = getQuestionsForLevel(difficulty, level);
    expect(questions).toHaveLength(5);
    for (const question of questions) {
      expect(question.prompt.length).toBeGreaterThan(0);
      expect(question.options).toHaveLength(4);
      expect(question.options).toContain(question.correct);
      expect(new Set(question.options).size).toBe(4);
    }
  });
});
