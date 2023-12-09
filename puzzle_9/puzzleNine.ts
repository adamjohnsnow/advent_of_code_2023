export function convertLine(line: number[]) {
  const newLine: number[] = [];
  for (let i = 0; i < line.length - 1; i++) {
    newLine.push(line[i + 1] - line[i]);
  }
  return newLine;
}
