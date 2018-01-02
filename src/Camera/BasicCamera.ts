
import { Geometry } from '../Math/Geometry';
import { Camera } from '../Primitive/Camera';

export abstract class BasicCamera implements Camera {
  abstract projectPoint(hyperPoint: number[]): [number, number];
  projectGeometry(hyperGeometry) {
    const flatGeometry = Geometry.clone(hyperGeometry);

    flatGeometry.mapVectors((vector) => {
      if (undefined !== vector) {
        return this.projectPoint(vector);
      }
    });

    return flatGeometry;
  }
}
