export function getAvg(score): number {
  return score.reduce(function (p, c) {
    return p + c;
  }) / score.length;
}