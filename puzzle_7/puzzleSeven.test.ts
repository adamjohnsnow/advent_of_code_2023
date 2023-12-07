import { describe, expect, test } from "@jest/globals";
import { countKinds, rankHand } from "./puzzleSeven";

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

  test("rank hand", () => {
    let hand = [
      { value: 1, count: 1 },
      { value: 2, count: 1 },
      { value: 3, count: 1 },
      { value: 4, count: 2 },
    ];
    console.log(hand);
    expect(rankHand(hand)).toEqual(204);

    hand = [
      { value: 1, count: 1 },
      { value: 2, count: 1 },
      { value: 3, count: 2 },
      { value: 4, count: 1 },
    ];
    console.log(hand);
    expect(rankHand(hand)).toEqual(203);
  });
});
