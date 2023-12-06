export function boat(holdTime: number, raceTime: number): number {
  const moveTime = raceTime - holdTime;

  return moveTime * holdTime;
}

export function waysToWin(raceTime: number, distance: number): number {
  let winners: number[] = [];
  for (let i = 1; i < raceTime; i++) {
    const move = boat(i, raceTime);
    if (move > distance) {
      winners.push(move);
    }
  }
  return winners.length;
}

function multiplyArray(numbers) {
  return numbers.reduce(
    (accumulator, currentValue) => accumulator * currentValue,
    1
  );
}
