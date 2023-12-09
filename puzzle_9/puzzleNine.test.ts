import { describe, expect, test } from "@jest/globals";
import { convertLine } from "./puzzleNine";

describe("puzzle nine", () => {
  test("convert a line", () => {
    const line = [0, 3, 6, 9];

    expect(convertLine(line)).toEqual([3, 3, 3]);
  });
});
