type Galaxy = { id: number; x: number; y: number };
export type Report = {
  map: string[][];
  extraRows: number[];
  extraCols: number[];
  galaxies: Galaxy[];
};

export function expandsRows(starMap: string[]): Report {
  const newReport: Report = {
    map: [],
    extraRows: [],
    extraCols: [],
    galaxies: [],
  };
  starMap.forEach((line, i) => {
    newReport.map.push(line.split(""));
    if (!line.includes("#")) {
      newReport.extraRows.push(i);
    }
  });
  return newReport;
}

export function expandsColumns(report: Report): Report {
  let transposedMap = report.map[0].map((_col, i) =>
    report.map.map((row) => row[i])
  );
  transposedMap.forEach((line, i) => {
    if (!line.includes("#")) {
      report.extraCols.push(i);
    }
  });
  return report;
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

export function calcDistances(report: Report, factor: number) {
  const distances: number[] = [];
  report.galaxies.forEach((galaxy, index) => {
    for (let i = index + 1; i < report.galaxies.length; i++) {
      let steps = 0;

      const ys = [galaxy.y, report.galaxies[i].y];
      for (let r = Math.min(...ys) + 1; r < Math.max(...ys) + 1; r++) {
        if (report.extraRows.includes(r)) {
          steps += factor - 1;
        }
        steps += 1;
      }

      const xs = [galaxy.x, report.galaxies[i].x];
      for (let c = Math.min(...xs) + 1; c < Math.max(...xs) + 1; c++) {
        if (report.extraCols.includes(c)) {
          steps += factor - 1;
        }
        steps += 1;
      }

      distances.push(steps);
    }
  });
  return distances;
}

export function getDistancesFromMap(report: Report, factor: number) {
  const distances = calcDistances(report, factor);
  return distances.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
}
