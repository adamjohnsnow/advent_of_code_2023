type Galaxy = { id: number; x: number; y: number };

export function doubleRows(starMap: string[]): string[][] {
  const newMap: string[][] = [];
  starMap.forEach((line) => {
    newMap.push(line.split(""));
    if (!line.includes("#")) {
      newMap.push(line.split(""));
    }
  });
  return newMap;
}

export function doubleColumns(starMap: string[][]): string[][] {
  const newMap: string[][] = [];

  let transposedMap = starMap[0].map((_col, i) => starMap.map((row) => row[i]));
  transposedMap.forEach((line) => {
    newMap.push(line);
    if (!line.includes("#")) {
      newMap.push(line);
    }
  });
  transposedMap = newMap[0].map((_col, i) => newMap.map((row) => row[i]));
  return transposedMap;
}

export function findGalaxies(starMap: string[][]) {
  const galaxies: Galaxy[] = [];

  starMap.forEach((row, y) => {
    row.forEach((char, x) => {
      if (char === "#") {
        galaxies.push({ id: galaxies.length + 1, y: y, x: x });
      }
    });
  });

  return galaxies;
}

export function calcDistances(galaxies: Galaxy[]) {
  const distances: number[] = [];
  galaxies.forEach((galaxy, index) => {
    for (let i = index + 1; i < galaxies.length; i++) {
      distances.push(
        Math.abs(galaxy.y - galaxies[i].y) + Math.abs(galaxy.x - galaxies[i].x)
      );
    }
  });
  return distances;
}

export function getDistancesFromMap(map: string[]) {
  const padded = doubleColumns(doubleRows(map));
  return calcDistances(findGalaxies(padded)).reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
}
