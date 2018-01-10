
import { Vector } from './Vector';
import { Compare } from './Compare';

export type PlaneEquation = {
  A: Vector;
  AB: Vector;
  AC: Vector;
  λR: number;
  μR: number;
}

export namespace Plane {

  /**
   * Build hyperplane equation based on three vectors
   */
  export function buildEquation(vectorA: Vector, vectorB: Vector, vectorC: Vector): PlaneEquation {
    const AB = Vector.subtract(vectorB, vectorA);
    const AC = Vector.subtract(vectorC, vectorA);
    let λR = null;
    let μR = null;

    if (Compare.nearlyEqual(Vector.cosinus(AB, AC), 1.0)) { // are parallel
      return null;
    }

    // search for λ non zero row
    for (let i = 0; i < AB.length; ++i) {
      if (!Compare.nearlyEqual(AB[i], 0.0)) {
        λR = i;
        break;
      }
    }

    // search for μ non zero row
    for (let i = 0; i < AC.length; ++i) {
      if (i !== λR && !Compare.nearlyEqual(AC[i], 0.0)) {
        μR = i;
        break;
      }
    }

    if (null === λR || null === μR) { // not enough data
      return null;
    } else {
      return { A: vectorA, AB, AC, λR, μR };
    }
  }

  /**
   * Check if vectorX satisfies hyperplane equation
   */
  export function satisfiesEquation(vectorX: Vector, equation: PlaneEquation): boolean {
    const { A, AB, AC, λR, μR } = equation;
    const AX = Vector.subtract(vectorX, A);
    let eqλ;
    let eqμ;
    let λ;
    let μ;

    // resolve 2 equations to find λ and μ
    eqλ = [AX[λR], AB[λR], AC[λR]];
    eqμ = [AX[μR], AB[μR], AC[μR]];

    eqλ[0] /= eqλ[1];
    eqλ[2] /= eqλ[1];
    eqλ[1]  = 1;

    eqμ[0] -= eqμ[1] * eqλ[0];
    eqμ[2] -= eqμ[1] * eqλ[2];

    μ = eqμ[0] / eqμ[2];
    λ = eqλ[0] - eqλ[2] * μ;

    return Vector.nearlyEqual(
      AX,
      Vector.add(
        Vector.multiplyScalar(AB, λ),
        Vector.multiplyScalar(AC, μ)
      )
    );
  }
}