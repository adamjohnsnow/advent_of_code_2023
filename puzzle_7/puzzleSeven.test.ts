import { describe, expect, test } from "@jest/globals";
import { countKinds, evaluateHand } from "./puzzleSeven";

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

  test("evaluate hand", () => {
    let hand = [{ value: 14, count: 5 }];
    expect(evaluateHand(hand)).toEqual({
      fives: 14,
      fours: 0,
      ones: [],
      threes: 0,
      twos: [],
    });

    hand = [{ value: 1, count: 5 }];
    expect(evaluateHand(hand)).toEqual({
      fives: 1,
      fours: 0,
      ones: [],
      threes: 0,
      twos: [],
    });

    hand = [
      { value: 1, count: 4 },
      { value: 13, count: 1 },
    ];
    expect(evaluateHand(hand)).toEqual({
      fives: 0,
      fours: 1,
      ones: [13],
      threes: 0,
      twos: [],
    });

    hand = [
      { value: 2, count: 4 },
      { value: 13, count: 1 },
    ];
    expect(evaluateHand(hand)).toEqual({
      fives: 0,
      fours: 2,
      ones: [13],
      threes: 0,
      twos: [],
    });

    hand = [
      { value: 1, count: 3 },
      { value: 13, count: 2 },
    ];
    expect(evaluateHand(hand)).toEqual({
      fives: 0,
      fours: 0,
      ones: [],
      threes: 1,
      twos: [13],
    });
  });
});
