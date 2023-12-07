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

export function evaluateHand(hand: Output[]) {
  // const result: Result = {
  //   fives: hand.find((suit) => suit.count == 5)?.value || 0,
  //   fours: hand.find((suit) => suit.count == 4)?.value || 0,
  //   threes: hand.find((suit) => suit.count == 3)?.value || 0,
  //   twos: hand.filter((suit) => suit.count == 2)?.map((match) => match.value),
  //   ones: hand.filter((suit) => suit.count == 1)?.map((match) => match.value),
  // };
  // return result;
}

export function ranker(result: Output[]) {
  if (result.find((suit) => suit.count == 5)?.value) {
    return 7;
  }
  if (result.find((suit) => suit.count == 4)?.value) {
    return 6;
  }

  const threes = result.find((suit) => suit.count == 3)?.value;
  const twos = result
    .filter((suit) => suit.count == 2)
    ?.map((match) => match.value);

  if (threes && twos.length > 0) {
    return 5;
  }
  if (threes) {
    return 4;
  }
  if (twos.length == 2) {
    return 3;
  }
  if (twos.length == 1) {
    return 2;
  }
  return 1;
}

export function superSort(hands: Output[]) {}
