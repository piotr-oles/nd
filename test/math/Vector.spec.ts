import { Matrix } from '../../src/math/Matrix';
import { Vector } from '../../src/math/Vector';

describe('Vector', () => {

  function roundVector(vector: Vector): Vector {
    for (let x = 0; x < vector.length; ++x) {
      vector[x] = Math.round(vector[x] * 10000) / 10000;
    }

    return vector;
  }

  it('should build vector', () => {
    expect(Vector.build(3, 1)).toEqual(
      [1, 1, 1]
    );
  });

  it('should add two vectors', () => {
    expect(Vector.add([1, 2, 3], [4, 5, 6])).toEqual(
      [5, 7, 9]
    );
  });

  it('should subtract two vectors', () => {
    expect(Vector.subtract([1, 2, 3], [4, 5, 6])).toEqual(
      [-3, -3, -3]
    );
  });

  it('should multiply vector by scalar', () => {
    expect(Vector.multiplyScalar([1, 2, 3], 3)).toEqual(
      [3, 6, 9]
    );
  });

  it('should normalize vector', () => {
    expect(roundVector(Vector.normalize([3, 1, 2]))).toEqual(
      [.8018, .2673, .5345]
    );
  });

  it('should invert vector', () => {
    expect(roundVector(Vector.invert([1, 2, 3]))).toEqual(
      [-1, -2, -3]
    );
  });

  it('should rotate vector OX', () => {
    expect(roundVector(Vector.transform(
      [1, 2, 3],
      Matrix.buildRotation(3, 1, 2, Math.PI / 2)
    ))).toEqual(
      [1, -3, 2]
    );
  });

  it('should rotate vector OY', () => {
    expect(roundVector(Vector.transform(
      [1, 2, 3],
      Matrix.buildRotation(3, 0, 2, Math.PI / 2)
    ))).toEqual(
      [-3, 2, 1]
    );
  });

  it('should rotate vector OZ', () => {
    expect(roundVector(Vector.transform(
      [1, 2, 3],
      Matrix.buildRotation(3, 0, 1, Math.PI / 2)
    ))).toEqual(
      [-2, 1, 3]
    );
  });

  it('should scale vector', () => {
    expect(Vector.transform(
      [1, 2, 3],
      Matrix.buildScale([2, 3, -4])
    )).toEqual(
      [2, 6, -12]
    );
  });

  it('should translate vector', () => {
    expect(Vector.transform(
      [1, 2, 3],
      Matrix.buildTranslation([3, -2, 6])
    )).toEqual(
      [4, 0, 9]
    );
  });
});
