import { describe, expect, test } from "@jest/globals";
import {
  calcDistances,
  expandsColumns,
  expandsRows,
  findGalaxies,
  getDistancesFromMap,
  Report,
} from "./puzzleEleven";
import * as fs from "fs";

describe("puzzle 11", () => {
  test("expandss rows", () => {
    const startMap = ["...#...", ".......", "..#...."];
    const expected = [
      [".", ".", ".", "#", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", "."],
      [".", ".", "#", ".", ".", ".", "."],
    ];
    const result = expandsRows(startMap);
    expect(result.map).toEqual(expected);
    expect(result.extraRows.length).toEqual(1);
  });

  test("expandss columns", () => {
    const map = [
      ["#", ".", ".", "."],
      [".", ".", "#", "."],
      [".", ".", ".", "."],
      [".", ".", "#", "."],
    ];
    const startMap: Report = {
      map: map,
      extraRows: [],
      extraCols: [],
      galaxies: [],
    };

    const result = expandsColumns(startMap);
    expect(result.map).toEqual(map);
    expect(result.extraCols.length).toEqual(2);
  });

  test("expandss columns & rows", () => {
    const startMap = ["#...", "..#.", "....", "..#."];
    const expected = [
      ["#", ".", ".", "."],
      [".", ".", "#", "."],
      [".", ".", ".", "."],
      [".", ".", "#", "."],
    ];
    const result = expandsColumns(expandsRows(startMap));
    expect(result.map).toEqual(expected);
    expect(result.extraCols.length).toEqual(2);
    expect(result.extraRows.length).toEqual(1);
  });

  test("finds galaxies", () => {
    const stars = [
      ["#", ".", ".", "."],
      [".", ".", "#", "."],
      [".", ".", ".", "."],
      [".", ".", "#", "."],
    ];
    const expected = [
      { id: 1, y: 0, x: 0 },
      { id: 2, y: 1, x: 2 },
      { id: 3, y: 3, x: 2 },
    ];
    expect(findGalaxies(stars)).toEqual(expected);
  });

  test("distances", () => {
    const data: Report = {
      map: [
        ["#", ".", ".", "."],
        [".", ".", "#", "."],
        [".", ".", ".", "."],
        [".", ".", "#", "."],
      ],
      galaxies: [],
      extraCols: [1, 3],
      extraRows: [2],
    };
    data.galaxies = findGalaxies(data.map);
    expect(calcDistances(data, 1)).toEqual([4, 7, 3]);
    expect(calcDistances(data, 2)).toEqual([5, 9, 4]);
  });

  test("test run", async () => {
    fs.readFile("puzzle_11/test.txt", "utf8", (err, data) => {
      if (err) {
        console.error("Error reading the file:", err);
        return 0;
      }
      const lines: string[] = data.split("\n");
      const report = expandsColumns(expandsRows(lines));
      report.galaxies = findGalaxies(report.map);

      expect(report.galaxies.length).toEqual(9);
      expect(calcDistances(report, 1).length).toEqual(36);
      expect(getDistancesFromMap(report, 1)).toEqual(374);
      // expect(getDistancesFromMap(report, 10)).toEqual(1030);
      // expect(getDistancesFromMap(report, 100)).toEqual(8410);
    });
  });

  // test("big run", async () => {
  //   fs.readFile("puzzle_11/input.txt", "utf8", (err, data) => {
  //     if (err) {
  //       console.error("Error reading the file:", err);
  //       return 0;
  //     }
  //     const lines: string[] = data.split("\n");
  //     const report = expandsColumns(expandsRows(lines));

  //     expect(getDistancesFromMap(report, 1)).toEqual(10885634);
  //   });
  // });
});
