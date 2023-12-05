import {
  Card,
  findWinners,
  parseCard,
  processParsedCards,
  puzzleFourA,
} from "./puzzle_4";
import { describe, expect, test } from "@jest/globals";
import * as fs from "fs";

describe("Puzzle 4", () => {
  test("parseCard", () => {
    const card = parseCard("Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53");
    expect(card.results).toEqual(["41", "48", "83", "86", "17"]);
    expect(card.winners).toEqual([
      "83",
      "86",
      "6",
      "31",
      "17",
      "9",
      "48",
      "53",
    ]);

    expect(card.score).toEqual(4);
  });

  test("findWinners", () => {
    const result = ["1", "2", "3"];
    const winners = ["2", "3", "4"];

    expect(findWinners(result, winners)).toEqual(["2", "3"]);
  });
  test("process cards a", () => {
    const cards: Card[] = [
      { score: 2, copies: 1 },
      { score: 0, copies: 1 },
      { score: 0, copies: 1 },
      { score: 0, copies: 1 },
    ];

    const processed = processParsedCards(cards);
    expect(processed[0].copies).toEqual(1);
    expect(processed[1].copies).toEqual(2);
    expect(processed[2].copies).toEqual(2);
    expect(processed[3].copies).toEqual(1);
  });

  test("process cards b", () => {
    const cards: Card[] = [
      { score: 2, copies: 1 },
      { score: 2, copies: 1 },
      { score: 0, copies: 1 },
      { score: 0, copies: 1 },
    ];

    const processed = processParsedCards(cards);
    expect(processed[0].copies).toEqual(1);
    expect(processed[1].copies).toEqual(2);
    expect(processed[2].copies).toEqual(4);
    expect(processed[3].copies).toEqual(3);
  });

  test("process cards", () => {
    const cards: Card[] = [
      { score: 4, copies: 1 },
      { score: 2, copies: 1 },
      { score: 2, copies: 1 },
      { score: 1, copies: 1 },
      { score: 0, copies: 1 },
      { score: 0, copies: 1 },
    ];

    const processed = processParsedCards(cards);
    expect(processed[0].copies).toEqual(1);
    expect(processed[1].copies).toEqual(2);
    expect(processed[2].copies).toEqual(4);
    expect(processed[3].copies).toEqual(8);
    expect(processed[4].copies).toEqual(14);
    expect(processed[5].copies).toEqual(1);
  });

  test("run test cards", () => {
    fs.readFile("puzzle_4/puzzle_test.txt", "utf8", (err, data) => {
      if (err) {
        console.error("Error reading the file:", err);
        return 0;
      }

      const cards: string[] = data.split("\n");
      const power = puzzleFourA(cards);
      expect(power).toEqual(30);
    });
  });

  test("run test cards", () => {
    fs.readFile("puzzle_4/puzzle_input.txt", "utf8", (err, data) => {
      if (err) {
        console.error("Error reading the file:", err);
        return 0;
      }

      const cards: string[] = data.split("\n");
      const power = puzzleFourA(cards);
      expect(power).toEqual(14814534);
    });
  });
});
