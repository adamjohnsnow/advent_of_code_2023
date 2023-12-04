import { findWinners, parseCard, puzzleFour } from "./puzzle_4";
import { describe, expect, test } from "@jest/globals";
import * as fs from "fs";

describe("Puzzle 4", () => {
  test("parseCard", () => {
    const [result, winners] = parseCard(
      "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53"
    );
    expect(result).toEqual(["41", "48", "83", "86", "17"]);
    expect(winners).toEqual(["83", "86", "6", "31", "17", "9", "48", "53"]);
  });

  test("findWinners", () => {
    const result = ["1", "2", "3"];
    const winners = ["2", "3", "4"];

    expect(findWinners(result, winners)).toEqual(["2", "3"]);
  });

  test("run test cards", () => {
    fs.readFile("puzzle_4/puzzle_input.txt", "utf8", (err, data) => {
      if (err) {
        console.error("Error reading the file:", err);
        return 0;
      }

      const cards: string[] = data.split("\n");
      const power = puzzleFour(cards);
      expect(power).toEqual(33950);
    });
  });
});
