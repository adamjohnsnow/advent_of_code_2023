export function doubleRows(startMap: string[]): string[][] {
  const newMap: string[][] = [];
  startMap.forEach((line) => {
    newMap.push(line.split(""));
    if (!line.includes("#")) {
      newMap.push(line.split(""));
    }
  });
  return newMap;
}

export function doubleColumns(startMap: string[][]): string[][] {
  const newMap: string[][] = [];

  let transposedMap = startMap[0].map((_col, i) =>
    startMap.map((row) => row[i])
  );
  transposedMap.forEach((line) => {
    newMap.push(line);
    if (!line.includes("#")) {
      newMap.push(line);
    }
  });
  transposedMap = newMap[0].map((_col, i) => newMap.map((row) => row[i]));
  return transposedMap;
}
