import { describe, expect, test } from "@jest/globals";
import { doubleColumns, doubleRows } from "./puzzleEleven";

describe("puzzle 11", () => {
  test("doubles rows", () => {
    const startMap = ["...#...", ".......", "..#...."];
    const expected = [
      [".", ".", ".", "#", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", "."],
      [".", ".", "#", ".", ".", ".", "."],
    ];
    expect(doubleRows(startMap)).toEqual(expected);
  });

  test("doubles columns", () => {
    const startMap = [
      ["#", ".", ".", "."],
      [".", ".", "#", "."],
      [".", ".", ".", "."],
      [".", ".", "#", "."],
    ];
    const expected = [
      ["#", ".", ".", ".", ".", "."],
      [".", ".", ".", "#", ".", "."],
      [".", ".", ".", ".", ".", "."],
      [".", ".", ".", "#", ".", "."],
    ];
    expect(doubleColumns(startMap)).toEqual(expected);
  });

  test("doubles columns & rows", () => {
    const startMap = ["#...", "..#.", "....", "..#."];
    const expected = [
      ["#", ".", ".", ".", ".", "."],
      [".", ".", ".", "#", ".", "."],
      [".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", "."],
      [".", ".", ".", "#", ".", "."],
    ];
    expect(doubleColumns(doubleRows(startMap))).toEqual(expected);
  });
});
