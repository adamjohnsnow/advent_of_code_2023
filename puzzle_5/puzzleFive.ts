export async function run(fileLines: string[]): Promise<number> {
  const seedRanges: string[] = fileLines[0].split(" ").slice(1);

  const mapNames: string[] = [
    "seed-to-soil map:",
    "soil-to-fertilizer map:",
    "fertilizer-to-water map:",
    "water-to-light map:",
    "light-to-temperature map:",
    "temperature-to-humidity map:",
    "humidity-to-location map:",
  ];

  const maps: { [key: string]: number[][] } = {};

  mapNames.forEach((map, i) => {
    const name: string = map.replace(" map:", "");
    const lowerBoundary: number = fileLines.indexOf(map) + 1;
    let upperBoundary: number = fileLines.indexOf(mapNames[i + 1]);
    upperBoundary < 0 ? (upperBoundary = fileLines.length) : upperBoundary;

    const rawMaps: string[] = fileLines
      .slice(lowerBoundary, upperBoundary)
      .filter(Boolean);
    maps[name] = rawMaps.map((rawMap) =>
      rawMap.split(" ").map((num) => parseInt(num, 10))
    );
  });

  let lowest: number = 0;
  let seedIndex: number = 0;

  while (seedIndex < seedRanges.length) {
    let seed: number = parseInt(seedRanges[seedIndex], 10);
    const endSeed: number = seed + parseInt(seedRanges[seedIndex + 1], 10);
    while (seed < endSeed) {
      let pointer: number = seed;

      for (const map of Object.values(maps)) {
        for (const range of map) {
          if (pointer >= range[1] && pointer < range[1] + range[2]) {
            pointer = pointer + (range[0] - range[1]);
            break;
          }
        }
      }

      lowest = pointer < lowest || lowest === 0 ? pointer : lowest;
      seed += 1;
    }

    seedIndex += 2;
  }

  return lowest;
}
