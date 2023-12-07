import { describe, expect, test } from "@jest/globals";
import { countKinds, evaluateHand, ranker } from "./puzzleSeven";

describe("Puzzle 7", () => {
  test("count kinds", () => {
    let cards = "12344";
    expect(countKinds(cards)).toEqual([
      { value: 1, count: 1 },
      { value: 2, count: 1 },
      { value: 3, count: 1 },
      { value: 4, count: 2 },
    ]);

    cards = "12244";
    expect(countKinds(cards)).toEqual([
      { value: 1, count: 1 },
      { value: 2, count: 2 },
      { value: 4, count: 2 },
    ]);

    cards = "12K4K";
    expect(countKinds(cards)).toEqual([
      { value: 1, count: 1 },
      { value: 2, count: 1 },
      { value: 13, count: 2 },
      { value: 4, count: 1 },
    ]);
  });

  test("ranker", () => {
    let hand = [{ value: 14, count: 5 }];

    expect(ranker(hand)).toBe(7);

    hand = [
      { value: 1, count: 1 },
      { value: 2, count: 1 },
      { value: 3, count: 1 },
      { value: 4, count: 2 },
    ];

    expect(ranker(hand)).toBe(2);

    hand = [
      { value: 1, count: 1 },
      { value: 2, count: 1 },
      { value: 3, count: 1 },
      { value: 4, count: 1 },
      { value: 4, count: 1 },
    ];

    expect(ranker(hand)).toBe(1);

    hand = [
      { value: 13, count: 2 },
      { value: 5, count: 3 },
    ];

    expect(ranker(hand)).toBe(5);
  });
});
