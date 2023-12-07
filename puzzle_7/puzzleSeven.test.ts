import { describe, expect, test } from "@jest/globals";
import {
  addUp,
  countKinds,
  payOut,
  processCards,
  ranker,
  superSort,
} from "./puzzleSeven";
import * as fs from "fs";

const cards = ["32T3K 765", "T55J5 684", "KK677 28", "KTJJT 220", "QQQJA 483"];

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

  test("process cards", () => {
    const result = processCards(cards);

    expect(result[0].wager).toBe(765);
    expect(result[0].hand).toBe("32T3K");
    expect(result[0].rank).toBe(2);

    expect(result[1].wager).toBe(684);
    expect(result[1].hand).toBe("T55J5");
    expect(result[1].rank).toBe(4);

    expect(result[2].wager).toBe(28);
    expect(result[2].hand).toBe("KK677");
    expect(result[2].rank).toBe(3);
  });

  test("sort cards", () => {
    const result = processCards(cards);
    const sorted = superSort(result);

    console.log(sorted);
    expect(sorted[0].wager).toBe(483);
    expect(sorted[0].hand).toBe("QQQJA");
    expect(sorted[0].rank).toBe(4);

    expect(sorted[1].hand).toBe("T55J5");
    expect(sorted[2].hand).toBe("KK677");
    expect(sorted[3].hand).toBe("KTJJT");
    expect(sorted[4].hand).toBe("32T3K");
  });

  test("pay out", () => {
    const result = processCards(cards);
    const sorted = superSort(result);
    const winnings = payOut(sorted);
    console.log(winnings);
    expect(winnings[0]).toEqual(765 * 1);
    expect(winnings[1]).toEqual(220 * 2);
    expect(winnings[2]).toEqual(28 * 3);
    expect(winnings[3]).toEqual(684 * 4);
    expect(winnings[4]).toEqual(483 * 5);

    expect(addUp(winnings)).toEqual(6440);
  });

  test("big one", () => {
    fs.readFile("puzzle_7/input.txt", "utf8", (err, data) => {
      if (err) {
        console.error("Error reading the file:", err);
        return 0;
      }
      const lines: string[] = data.split("\n");
      const result = processCards(lines);
      const sorted = superSort(result);
      const winnings = payOut(sorted);

      expect(addUp(winnings)).toEqual(6440);
    });
  });
});
