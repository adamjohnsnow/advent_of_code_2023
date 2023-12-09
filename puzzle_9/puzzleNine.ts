export function convertLine(line: number[]): number[] {
  const newLine: number[] = [];
  for (let i = 0; i < line.length - 1; i++) {
    newLine.push(line[i + 1] - line[i]);
  }
  return newLine;
}

export function isSame(line: number[]): boolean {
  const targetNumber = line[0];
  const repeats = line.reduce(
    (count, number) => (number === targetNumber ? count + 1 : count),
    0
  );
  return line.length === repeats;
}

export function processLine(line: string): number[][] {
  let lines: number[][] = [];
  let newLine: number[] = [];
  line.split(" ").forEach((num) => {
    newLine.push(parseInt(num, 10));
  });
  lines.push(newLine);

  while (!isSame(newLine)) {
    newLine = convertLine(newLine);
    lines.push(newLine);
  }
  return lines;
}

export function findNext(input: number[][]): number {
  let factor: number = input[input.length - 1][0];
  for (let i = input.length - 2; i > 0; i--) {
    const last = input[i][input[i].length - 1];

    factor = last + factor;
  }
  const result = input[0][input[0].length - 1] + factor;
  return result;
}
export function findPrevious(input: number[][]): number {
  let factor: number = input[input.length - 1][0];
  for (let i = input.length - 2; i > 0; i--) {
    const last = input[i][input[i].length - 1];

    factor = last + factor;
  }
  const result = input[0][input[0].length - 1] + factor;
  return result;
}
