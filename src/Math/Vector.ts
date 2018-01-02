
import { Matrix } from './Matrix';
import { Compare } from './Compare';

export type Vector = number[];

export namespace Vector {
  export function build(size: number, fill: number = 0.0): Vector {
    const vector = [];

    for (let i = 0; i < size; ++i) {
      vector[i] = fill;
    }

    return vector;
  }

  export function add(vectorA: Vector, vectorB: Vector): Vector {
    const vector = vectorA.slice(0);
    const size = vector.length;

    for (let i = 0; i < size; ++i) {
      vector[i] += vectorB[i];
    }

    return vector;
  }

  export function addScalar(vectorA: Vector, scalarB: number): Vector {
    const vector = vectorA.slice(0);
    const size = vector.length;

    for (let i = 0; i < size; ++i) {
      vector[i] += scalarB;
    }

    return vector;
  }

  export function subtract(vectorA: Vector, vectorB: Vector): Vector {
    const vector = vectorA.slice(0);
    const size = vector.length;

    for (let i = 0; i < size; ++i) {
      vector[i] -= vectorB[i];
    }

    return vector;
  }

  export function subtractScalar(vectorA: Vector, scalarB: number): Vector {
    const vector = vectorA.slice(0);
    const size = vector.length;

    for (let i = 0; i < size; ++i) {
      vector[i] -= scalarB;
    }

    return vector;
  }

  export function multiply(vectorA: Vector, vectorB: Vector): Vector {
    const vector = vectorA.slice(0);
    const size = vector.length;

    for (let i = 0; i < size; ++i) {
      vector[i] *= vectorB[i];
    }

    return vector;
  }

  export function multiplyScalar(vectorA: Vector, scalarB: number): Vector {
    const vector = vectorA.slice(0);
    const size = vector.length;

    for (let i = 0; i < size; ++i) {
      vector[i] *= scalarB;
    }

    return vector;
  }

  export function divide(vectorA: Vector, vectorB: Vector): Vector {
    const vector = vectorA.slice(0);
    const size = vector.length;

    for (let i = 0; i < size; ++i) {
      if (0 === vectorB[i]) {
        vector[i] *= Infinity;
      } else {
        vector[i] /= vectorB[i];
      }
    }

    return vector;
  }

  export function divideScalar(vectorA: Vector, scalarB: number): Vector {
    const vector = vectorA.slice(0);
    const size = vector.length;

    for (let i = 0; i < size; ++i) {
      if (0 === scalarB) {
        vector[i] *= Infinity;
      } else {
        vector[i] /= scalarB;
      }
    }

    return vector;
  }

  export function multiplyMatrix(vectorA: Vector, matrixB: Matrix): Vector {
    const vector = build(vectorA.length, 0.0);
    const size = vector.length;

    for (let y = 0; y < size; ++y) {
      for (let x = 0; x < size; ++x) {
        vector[y] += matrixB[y * size + x] * vector[x];
      }
    }

    return vector;
  }

  export function normalize(vectorA: Vector): Vector {
    const vector = vectorA.slice(0);
    const size = vector.length;
    let distancePow2 = 0.0;

    for (let i = 0; i < size; ++i) {
      distancePow2 += vector[i] * vector[i];
    }

    const normalizer = 1 / Math.sqrt(distancePow2);

    for (let j = 0; j < size; ++j) {
      vector[j] *= normalizer;
    }

    return vector;
  }

  export function resize(vectorA: Vector, size: number): Vector {
    const length = distance(vectorA);

    if (0 !== length) {
      return multiplyScalar(vectorA, size / length);
    } else {
      return build(vectorA.length);
    }
  }

  export function invert(vectorA: Vector): Vector {
    const vector = vectorA.slice(0);
    const size = vector.length;

    for (let i = 0; i < size; ++i) {
      vector[i] *= -1;
    }

    return vector;
  }

  export function flatten(vectorA: Vector): Vector {
    const vector = build(vectorA.length - 1);
    const size = vector.length;

    for (let i = 0; i < size; ++i) {
      vector[i] = vectorA[i];
    }

    return vector;
  }

  export function transform(vectorA: Vector, matrixB: Matrix): Vector {
    const vector = build(vectorA.length);
    const size = vector.length;

    for (let y = 0; y < size; ++y) {
      // rotations and scales
      for (let x = 0; x < size; ++x) {
        vector[y] += matrixB[y * (size + 1) + x] * vectorA[x];
      }

      // translations
      vector[y] += matrixB[(size + 1) * y + size];
    }

    return vector;
  }

  export function distance(vectorA: Vector, vectorB?: Vector): number {
    let distancePow2 = 0.0;
    const size = vectorA.length;

    if (!vectorB) {
      for (let i = 0; i < size; ++i) {
        distancePow2 += vectorA[i] * vectorA[i];
      }
    } else {
      for (let i = 0; i < size; ++i) {
        distancePow2 += (vectorA[i] - vectorB[i]) * (vectorA[i] - vectorB[i]);
      }
    }

    return Math.sqrt(distancePow2);
  }

  export function dot(vectorA: Vector, vectorB: Vector): number {
    let product = 0.0;
    const size = vectorA.length;

    for (let i = 0; i < size; ++i) {
      product += vectorA[i] * vectorB[i];
    }

    return product;
  }

  export function cosinus(vectorA: Vector, vectorB: Vector): number {
    const distance = distance(vectorA, vectorB);
    const dot = dot(vectorA, vectorB);

    return distance === 0.0 ? NaN : dot / distance;
  }

  export function sinus(vectorA: Vector, vectorB: Vector): number {
    const cosinus = cosinus(vectorA, vectorB);

    if (!isNaN(cosinus)) {
      return Math.sqrt(1 - cosinus * cosinus);
    } else {
      return NaN;
    }
  }

  export function equal(vectorA: Vector, vectorB: Vector): boolean {
    const size = vectorA.length;
    let isEqual = true;

    for (let i = 0; i < size; ++i) {
      if (vectorA[i] !== vectorB[i]) {
        isEqual = false;
        break;
      }
    }

    return isEqual;
  }

  export function nearlyEqual(vectorA: Vector, vectorB: Vector): boolean {
    const size = vectorA.length;
    let isNearlyEqual = true;

    for (let i = 0; i < size; ++i) {
      if (!Compare.nearlyEqual(vectorA[i], vectorB[i])) {
        isNearlyEqual = false;
        break;
      }
    }

    return isNearlyEqual;
  }

  export function arithmeticAverage(vectorA: Vector): number {
    const size = vectorA.length;
    let sum = 0.0;

    for (let i = 0; i < size; ++i) {
      sum += vectorA[i];
    }

    return size !== 0 ? sum / size : NaN;
  }

  export function toString(vectorA: Vector): string {
    return '[' + vectorA.join(',') + ']';
  }
}
