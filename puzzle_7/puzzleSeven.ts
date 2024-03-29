const faceCards = ["T", "Q", "K", "A"];

type Output = {
  value: number;
  count: number;
};

type ProcessedHand = { hand: string; wager: number; rank: number };

export function processCards(hands: string[]) {
  let output: ProcessedHand[] = [];
  hands.forEach((hand) => {
    const split = hand.split(" ");
    output.push({
      hand: split[0],
      wager: parseInt(split[1]),
      rank: ranker(countKinds(split[0])),
    });
  });
  return output;
}

export function countKinds(cards: string) {
  const result: Output[] = [];
  cards.split("").map((suit) => {
    let suitValue = converter(suit);

    const existing = result.find((i) => i.value === suitValue);
    if (existing) {
      existing.count++;
    } else {
      result.push({ value: suitValue, count: 1 });
    }
  });

  return result;
}

export function ranker(result: Output[]) {
  const jokers = result.find((suit) => suit.value == 1);
  const jokersCount = jokers?.count || 0;

  const threes = result.find((suit) => suit.count == 3)?.value;
  const twos = result
    .filter((suit) => suit.count == 2)
    ?.map((match) => match.value);

  if (
    result.find((suit) => suit.count == 5)?.value ||
    (threes === 1 && twos.length === 1) ||
    (threes && threes > 1 && jokersCount == 2) ||
    jokersCount === 4
  ) {
    return 7;
  }

  if (result.find((suit) => suit.count == 4)?.value) {
    return 6 + jokersCount;
  }

  if (threes === 1 && twos.length === 0) {
    return 6;
  }

  if (threes && threes > 1 && jokersCount === 1) {
    return 6;
  }

  if (twos.length > 1 && jokersCount > 1) {
    return 6;
  }

  if (twos.length == 2 && jokersCount === 1) {
    return 5;
  }

  if (threes && twos.length > 0) {
    return 5;
  }

  if (threes) {
    return 4;
  }
  if (twos.length == 1 && jokersCount == 1) {
    return 4;
  }

  if (twos.length == 2) {
    return twos.length + 1 + jokersCount;
  }

  if (twos.length == 1) {
    return 2 + jokersCount;
  }

  return 1 + jokersCount;
}

export function superSort(hands: ProcessedHand[]) {
  return hands.sort((a, b) => {
    if (b.rank != a.rank) {
      return b.rank - a.rank;
    } else {
      for (let i = 0; i < 5; i++) {
        if (a.hand[i] != b.hand[i]) {
          return converter(b.hand[i]) - converter(a.hand[i]);
        }
      }
      return 0;
    }
  });
}

export function payOut(hands: ProcessedHand[]) {
  const winnings: number[] = [];
  hands.reverse().forEach((hand, index) => {
    winnings.push(hand.wager * (index + 1));
  });
  return winnings;
}

export function addUp(winnings: number[]) {
  return winnings.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
}

function converter(value: string) {
  if (value === "J") {
    return 1;
  }
  if (faceCards.includes(value)) {
    return faceCards.indexOf(value) + 10;
  } else {
    return parseInt(value, 10);
  }
}
