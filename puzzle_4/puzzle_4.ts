export function puzzleFour(cards: string[]): number {
  let power = 0;
  cards.forEach((card) => {
    const [result, winners] = parseCard(card);
    const winningNumbers = findWinners(result, winners);
    if (winningNumbers.length > 0) {
      power += Math.pow(2, winningNumbers.length - 1);
    }
  });
  return power;
}

export function parseCard(line: string): [string[], string[]] {
  const game = line.split(/[:|]/);
  const result = game[1].trim().split(" ");
  const winners = game[2].split(" ");
  return [
    result.filter((item) => item !== ""),
    winners.filter((item) => item !== ""),
  ];
}

export function findWinners(result: string[], winners: string[]) {
  return result.filter((item) => winners.includes(item));
}
