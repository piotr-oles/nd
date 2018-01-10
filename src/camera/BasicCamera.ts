
import { Geometry } from '../math/Geometry';
import { Camera } from '../primitive/Camera';
import { FlatPoint, HyperPoint } from '../primitive/Point';

export abstract class BasicCamera implements Camera {
  abstract projectPoint(hyperPoint: HyperPoint): FlatPoint;
  projectGeometry(hyperGeometry: Geometry): Geometry {
    const flatGeometry = Geometry.clone(hyperGeometry);

    flatGeometry.mapVectors((vector) => {
      if (undefined !== vector) {
        return this.projectPoint(vector);
      }
    });

    return flatGeometry;
  }
}
