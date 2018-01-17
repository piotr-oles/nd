import { Compare } from './Compare';
import { Set } from './Set';
import { Vector } from './Vector';
import nearlyEqual = Compare.nearlyEqual;

export class Plotter {
  static plot(
    equation: (...args: number[]) => number,
    dimension: number,
    domain: [number, number],
    density: number
  ): Vector[] {
    const vectors = [];
    const step = (domain[1] - domain[0]) / density;

    const grid = [];
    for (let x = domain[0]; x <= domain[1]; x += step) {
      grid.push(x);
    }

    for (let vector of Set.variation(grid, dimension)) {
      if (Math.abs(equation(...vector) - vector[0]) < step) {
        vectors.push(vector);
      }
    }

    return vectors;
  }
}
