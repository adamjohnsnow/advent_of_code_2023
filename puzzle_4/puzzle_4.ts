export type Card = {
  results?: string[];
  winners?: string[];
  score: number;
  copies: number;
};

export function puzzleFourA(cards: string[]): number {
  let parsedCards: Card[] = [];
  cards.forEach((card) => {
    parsedCards.push(parseCard(card));
  });
  processParsedCards(parsedCards);
  return parsedCards.reduce((acc, card) => acc + card["copies"], 0);
}

export function parseCard(line: string): Card {
  const game = line.split(/[:|]/);
  const result = game[1].trim().split(" ");
  const winners = game[2].split(" ");
  return {
    results: result.filter((item) => item !== ""),
    winners: winners.filter((item) => item !== ""),
    score: findWinners(
      result.filter((item) => item !== ""),
      winners.filter((item) => item !== "")
    ).length,
    copies: 1,
  };
}

export function findWinners(result: string[], winners: string[]) {
  return result.filter((item) => winners.includes(item));
}

export function processParsedCards(cards: Card[]): Card[] {
  const processedCards = cards;
  for (let i = 0; i < cards.length; i++) {
    for (let n = i; n < i + cards[i].score; n++) {
      processedCards[n + 1].copies += cards[i].copies;
    }
  }
  return processedCards;
}
