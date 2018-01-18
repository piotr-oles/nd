
import { Vector } from './Vector';

export type Matrix = number[];

export namespace Matrix {
  export function build(size: number, fill: number): Matrix {
    const matrix = [];

    for (let y = 0; y < size; ++y) {
      for (let x = 0; x < size; ++x) {
        matrix.push(fill);
      }
    }

    return matrix;
  }

  export function buildIdentity(size: number): Matrix {
    const matrix = [];

    for (let y = 0; y < size; ++y) {
      for (let x = 0; x < size; ++x) {
        matrix[y * size + x] = (x === y) ? 1.0 : 0.0;
      }
    }

    return matrix;
  }

  export function add(matrixA: Matrix, matrixB: Matrix): Matrix {
    const matrix = matrixA.slice(0);
    const length = matrix.length;

    for (let i = 0; i < length; ++i) {
      matrix[i] += matrixB[i];
    }

    return matrix;
  }

  export function subtract(matrixA: Matrix, matrixB: Matrix): Matrix {
    const matrix = matrixA.slice(0);
    const length = matrix.length;

    for (let i = 0; i < length; ++i) {
      matrix[i] -= matrixB[i];
    }

    return matrix;
  }

  export function multiply(matrixA: Matrix, matrixB: Matrix): Matrix {
    const matrix = [];
    const length = matrixA.length;
    const size = Math.sqrt(length) | 0;

    switch (size) {
      case 1:
        matrix[0] *= matrixB[0];
        break;

      case 2:
        matrix[0] = (matrixA[0] * matrixB[0]) + (matrixA[1] * matrixB[2]);
        matrix[1] = (matrixA[0] * matrixB[1]) + (matrixA[1] * matrixB[3]);
        matrix[2] = (matrixA[2] * matrixB[0]) + (matrixA[3] * matrixB[2]);
        matrix[3] = (matrixA[2] * matrixB[1]) + (matrixA[3] * matrixB[3]);
        break;

      default:
        let indexA, indexB;

        for (let i = 0; i < length; ++i) {
          matrix[i] = 0.0;

          for (let j = 0; j < size; ++j) {
            indexA = (Math.floor(i / size) * size) + j;
            indexB = (j * size) + (i % size);

            matrix[i] += matrixA[indexA] * matrixB[indexB];
          }
        }
        break;
    }

    return matrix;
  }

  export function multiplyVector(matrixA: Matrix, vectorB: Vector): Matrix {
    const matrix = matrixA.slice(0);
    const size = Math.sqrt(matrix.length) | 0;

    for (let y = 0; y < size; ++y) {
      for (let x = 0; x < size; ++x) {
        matrix[y * size + x] *= vectorB[x];
      }
    }

    return matrix;
  }

  export function multiplyScalar(matrixA: Matrix, scalarB: number): Matrix {
    const matrix = matrixA.slice(0);
    const length = matrix.length;

    for (let i = 0; i < length; ++i) {
      matrix[i] *= scalarB;
    }

    return matrix;
  }

  export function multiplyBulk(matrices: Matrix[]): Matrix {
    let result = multiply(matrices.shift(), matrices.shift());

    while (matrices.length) {
      result = multiply(result, matrices.shift());
    }

    return result;
  }

  export function transpose(matrixA: Matrix): Matrix {
    const matrix = [];
    const size = Math.sqrt(matrixA.length) | 0;

    for (let y = 0; y < size; ++y) {
      for (let x = 0; x < size; ++x) {
        matrix[(size - y) * size - x - 1] = matrixA[y * size + x];
      }
    }

    return matrix;
  }

  export function buildRotation(size: number, axisA: number, axisB: number, θ: number, origin?: Vector): Matrix {
    ++size; // add w parameter

    const cos = Math.cos(θ);
    const sin = Math.sin(θ);
    let matrix = [];

    for (let y = 0; y < size; ++y) {
      for (let x = 0; x < size; ++x) {
        if (x === y) {
          if (x === axisA || x === axisB) {
            matrix[y * size + x] = cos;
          } else {
            matrix[y * size + x] = 1.0;
          }
        } else if (x === axisA && y === axisB) {
          matrix[y * size + x] = sin;
        } else if (x === axisB && y === axisA) {
          matrix[y * size + x] = -sin;
        } else {
          matrix[y * size + x] = 0.0;
        }
      }
    }

    // if (origin) {
    //   const originMatrixApply = buildTranslation(origin.slice(0).map(x => -x));
    //   const originMatrixCancel = buildTranslation(origin);
    //
    //   matrix = multiplyBulk([
    //     originMatrixApply,
    //     matrix,
    //     originMatrixCancel
    //   ]);
    // }

    return matrix;
  }

  export function buildTranslation(distances: Vector): Matrix {
    const size = distances.length + 1; // add w parameter
    const matrix = [];

    for (let y = 0; y < size; ++y) {
      for (let x = 0; x < size; ++x) {
        if (x === y) {
          matrix[y * size + x] = 1.0;
        } else if (size - 1 === x) {
          matrix[y * size + x] = distances[y];
        } else {
          matrix[y * size + x] = 0.0;
        }
      }
    }

    return matrix;
  }

  export function buildScale(scales: Vector): Matrix {
    const size = scales.length + 1; // add w parameter
    const matrix = [];

    for (let y = 0; y < size; ++y) {
      for (let x = 0; x < size; ++x) {
        if (x === y) {
          if (y !== size - 1) {
            matrix[y * size + x] = scales[y];
          } else {
            matrix[y * size + x] = 1.0;
          }
        } else {
          matrix[y * size + x] = 0.0;
        }
      }
    }

    return matrix;
  }

  export function compose(size: number, scale: Matrix, translation: Matrix, rotation: Matrix): Matrix {
    let matrix = buildIdentity(size + 1);

    if (scale) {
      matrix = multiply(matrix, scale);
    }

    if (translation) {
      matrix = multiply(matrix, translation);
    }

    if (rotation) {
      matrix = multiply(matrix, rotation);
    }

    return matrix;
  }
}
