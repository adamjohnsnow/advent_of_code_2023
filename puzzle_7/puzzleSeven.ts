const faceCards = ["T", "J", "Q", "K", "A"];
type Output = {
  value: number;
  count: number;
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

export function rankHand(hand: Output[]) {
  hand.sort((a, b) => b.count - a.count);
  let score = 0;
  switch (hand[0].count) {
    case 2: {
      score = 200 + hand[0].value;
      break;
    }
  }
  return score;
}
