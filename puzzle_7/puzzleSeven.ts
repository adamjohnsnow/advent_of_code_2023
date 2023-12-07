const faceCards = ["T", "J", "Q", "K", "A"];
type Result = {
  fives: number;
  fours: number;
  threes: number;
  twos: number[];
  ones: number[];
};

type Output = {
  value: number;
  count: number;
  rank?: number;
  result?: Result;
};

export function countKinds(cards: string) {
  const result: Output[] = [];
  cards.split("").map((suit) => {
    let suitValue = 0;
    if (faceCards.includes(suit)) {
      suitValue = faceCards.indexOf(suit) + 10;
    } else {
      suitValue = parseInt(suit, 10);
    }

    const existing = result.find((i) => i.value === suitValue);
    if (existing) {
      existing.count++;
    } else {
      result.push({ value: suitValue, count: 1 });
    }
  });
  return result;
}

export function evaluateHand(hand: Output[]) {
  const result: Result = {
    fives: hand.find((suit) => suit.count == 5)?.value || 0,
    fours: hand.find((suit) => suit.count == 4)?.value || 0,
    threes: hand.find((suit) => suit.count == 3)?.value || 0,
    twos: hand.filter((suit) => suit.count == 2)?.map((match) => match.value),
    ones: hand.filter((suit) => suit.count == 1)?.map((match) => match.value),
  };

  return result;
}
