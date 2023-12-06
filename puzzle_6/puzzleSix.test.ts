import { describe, expect, test } from "@jest/globals";
import { boat, waysToWin } from "./puzzleSix";

describe("Puzzle 6", () => {
  test("race the boat", () => {
    expect(boat(1, 7)).toEqual(6);
    expect(boat(2, 7)).toEqual(10);
    expect(boat(3, 7)).toEqual(12);
    expect(boat(4, 7)).toEqual(12);
    expect(boat(5, 7)).toEqual(10);
    expect(boat(6, 7)).toEqual(6);

    expect(boat(11, 30)).toEqual(209);
    expect(boat(19, 30)).toEqual(209);
    expect(boat(20, 30)).toEqual(200);
  });

  test("ways to win", () => {
    expect(waysToWin(7, 9)).toEqual(4);
    expect(waysToWin(15, 40)).toEqual(8);
    expect(waysToWin(30, 200)).toEqual(9);
  });

  test("practice", () => {
    const total = waysToWin(7, 9) * waysToWin(15, 40) * waysToWin(30, 200);
    expect(total).toEqual(288);
  });

  test("race", () => {
    const total =
      waysToWin(35, 212) *
      waysToWin(93, 2060) *
      waysToWin(73, 1201) *
      waysToWin(66, 1044);
    expect(total).toEqual(114400);
  });

  test("big race", () => {
    expect(waysToWin(35937366, 212206012011044)).toEqual(21039729);
  });
});

const puzzleInput =
  "Time:        35     93     73     66\nDistance:   212   2060   1201   1044";
