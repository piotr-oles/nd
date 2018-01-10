import { Matrix } from '../../src/math/Matrix';

describe('Matrix', () => {

  let matrixA: Matrix;
  let matrixB: Matrix;

  beforeEach(() => {
    matrixA =
      [
        0, 1, 2,
        3, 4, 5,
        6, 7, 8
      ];
    matrixB =
      [
        8, 7, 6,
        5, 4, 3,
        2, 1, 0
      ];
  });

  function roundMatrix(matrix: Matrix): Matrix {
    const size = Math.sqrt(matrix.length) | 0;

    for (let y = 0; y < size; ++y) {
      for (let x = 0; x < size; ++x) {
        matrix[y * size + x] = Math.round(matrix[y * size + x] * 10000) / 10000;
      }
    }

    return matrix;
  }

  it('should add two matrices', () => {
    expect(Matrix.add(matrixA, matrixB)).toEqual(
      [
        8, 8, 8,
        8, 8, 8,
        8, 8, 8
      ]
    );
  });

  it('should subtract two matrices', () => {
    expect(Matrix.subtract(matrixA, matrixB)).toEqual(
      [
        -8, -6, -4,
        -2,  0,  2,
        4,  6,  8
      ]
    );
  });

  it('should multiply two matrices', () => {
    expect(Matrix.multiply(matrixA, matrixB)).toEqual(
      [
        9,  6,  3,
        54, 42, 30,
        99, 78, 57
      ]
    );
  });

  it('should multiply matrix by scalar', () => {
    expect(Matrix.multiplyScalar(matrixA, 2)).toEqual(
      [
        0,  2,  4,
        6,  8, 10,
        12, 14, 16
      ]
    );
  });

  it('should transpose matrix', () => {
    expect(Matrix.transpose(matrixA)).toEqual(
      [
        8, 7, 6,
        5, 4, 3,
        2, 1, 0
      ]
    );
  });

  it('should build identity matrix', () => {
    expect(Matrix.buildIdentity(3)).toEqual(
      [
        1, 0, 0,
        0, 1, 0,
        0, 0, 1
      ]
    );
  });

  it('should build rotation matrix', () => {
    expect(roundMatrix(Matrix.buildRotation(3, 0, 1, Math.PI / 2))).toEqual(
      [
        0, -1, 0, 0,
        1,  0, 0, 0,
        0,  0, 1, 0,
        0,  0, 0, 1
      ]
    );
  });

  it('should build translation matrix', () => {
    expect(Matrix.buildTranslation([1, 2, 3])).toEqual(
      [
        1, 0, 0, 1,
        0, 1, 0, 2,
        0, 0, 1, 3,
        0, 0, 0, 1
      ]
    );
  });

  it('should build scale matrix', () => {
    expect(Matrix.buildScale([2, 3, 4])).toEqual(
      [
        2, 0, 0, 0,
        0, 3, 0, 0,
        0, 0, 4, 0,
        0, 0, 0, 1
      ]
    );
  });
});
