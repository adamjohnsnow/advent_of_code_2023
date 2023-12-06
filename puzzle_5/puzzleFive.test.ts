import { describe, expect, test } from "@jest/globals";
import * as fs from "fs";
import { run } from "./puzzleFive";

describe("Puzzle 5", () => {
  test("short version", () => {
    fs.readFile("puzzle_5/test.txt", "utf8", async (err, data) => {
      if (err) {
        console.error("Error reading the file:", err);
        return 0;
      }
      const lines: string[] = data.split("\n");
      const output = await run(lines);

      expect(output).toEqual(46);
    });
  });

  // test("long version", () => {
  //   fs.readFile("puzzle_5/input.txt", "utf8", async (err, data) => {
  //     if (err) {
  //       console.error("Error reading the file:", err);
  //       return 0;
  //     }
  //     const lines: string[] = data.split("\n");
  //     const output = await run(lines);

  //     expect(output).toEqual(46);
  //   });
  // });
});
