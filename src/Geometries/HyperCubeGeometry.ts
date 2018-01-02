import { ExpandByTranslationAlgorithm } from '../Algorithms/ExpandByTranslationAlgorithm';
import { FindFacesAlgorithm } from '../Algorithms/FindFacesAlgorithm';
import { Geometry } from '../Math/Geometry';
import { Vector } from '../Math/Vector';

export class HyperCubeGeometry extends Geometry {
  constructor(
    dimension: number,
    size: number,
    origin?: Vector,
    notifier?: (geometry: Geometry) => void
  ) {
    super(dimension, [], [], [], origin);

    this.addVertex([]);

    for (let i = 0; i < dimension; ++i) {
      ExpandByTranslationAlgorithm(this, -size, size, notifier);
    }

    FindFacesAlgorithm(this, notifier);
  }
}
