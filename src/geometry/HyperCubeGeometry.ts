import { expandByTranslation } from '../algorithm/expandByTranslation';
import { findFaces } from '../algorithm/findFaces';
import { Geometry } from '../math/Geometry';
import { Vector } from '../math/Vector';

export class HyperCubeGeometry extends Geometry {
  constructor(
    dimension: number,
    size: number,
    origin?: Vector
  ) {
    super(dimension, [], [], [], origin);

    this.addVertex([]);

    for (let i = 0; i < dimension; ++i) {
      expandByTranslation(this, -size, size);
    }

    findFaces(this);
  }
}
