import { describe, expect, test } from "@jest/globals";
import {
  convertLine,
  findNext,
  findPrevious,
  isSame,
  processLine,
} from "./puzzleNine";
import * as fs from "fs";

describe("puzzle nine", () => {
  test("convert a line", () => {
    const line = [0, 3, 6, 9];

    expect(convertLine(line)).toEqual([3, 3, 3]);
  });

  test("repeat checker", () => {
    let line = [3, 3, 3, 3];
    expect(isSame(line)).toBe(true);
    line = [3, 2, 3, 3];
    expect(isSame(line)).toBe(false);
  });

  test("line processor", () => {
    let line = "0 3 6 9";
    let processed = processLine(line);

    expect(processed[0][0]).toEqual(0);
    expect(processed[0][2]).toEqual(6);
    expect(processed[1]).toEqual([3, 3, 3]);

    line = "10 13 16 21 30 45";
    processed = processLine(line);

    expect(processed[0][0]).toEqual(10);
  });

  test("find next number", () => {
    let line = "0 3 6 9 12";
    let processed = processLine(line);

    expect(findNext(processed)).toEqual(15);

    line = "10 13 16 21 30 45";
    processed = processLine(line);

    expect(findNext(processed)).toEqual(68);
  });

  test("test run - next", () => {
    let answers: number[] = [];
    let sum = 0;
    fs.readFile("puzzle_9/test.txt", "utf8", (err, data) => {
      if (err) {
        console.error("Error reading the file:", err);
        return 0;
      }
      const lines: string[] = data.split("\n");
      lines.forEach((line) => {
        const processed = processLine(line);
        const result = findNext(processed);
        sum += result;
        answers.push(result);
      });
      expect(sum).toEqual(114);
    });
  });

  test("big run - next", () => {
    let answers: number[] = [];
    let sum = 0;
    fs.readFile("puzzle_9/input.txt", "utf8", (err, data) => {
      if (err) {
        console.error("Error reading the file:", err);
        return 0;
      }
      const lines: string[] = data.split("\n");
      lines.forEach((line) => {
        const processed = processLine(line);
        const result = findNext(processed);
        sum += result;
        answers.push(result);
      });
      expect(sum).toEqual(2101499000);
    });
  });

  test("test run - prev", () => {
    let answers: number[] = [];
    let sum = 0;
    fs.readFile("puzzle_9/test.txt", "utf8", (err, data) => {
      if (err) {
        console.error("Error reading the file:", err);
        return 0;
      }
      const lines: string[] = data.split("\n");
      lines.forEach((line) => {
        const processed = processLine(line);
        const result = findPrevious(processed);
        sum += result;
        answers.push(result);
      });
      expect(sum).toEqual(114);
    });
  });
});
