/*jshint esversion: 6 */

export function getAvg(score) {
  return score.reduce(function (p, c) {
    return p + c;
  }) / score.length;
}
