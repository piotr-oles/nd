import { Vector } from './Vector';

export type SequenceFormula = (n: number) => number;

export class Sequence {
  constructor(private readonly formula: SequenceFormula) {}

  slice(from: number, to: number): Vector {
    const vector = [];

    for (let n = from; n <= to; ++n) {
      vector.push(this.formula(n));
    }

    return vector;
  }

  a(n: number): number {
    return this.formula(n);
  }

  S(n: number): number {
    let sum = 0;

    for (let i = 1; i <= n; ++i) {
      sum += this.formula(i);
    }

    return sum;
  }
}
