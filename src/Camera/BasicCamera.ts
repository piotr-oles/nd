
import { Camera } from '../Primitive/Camera';

export abstract class BasicCamera implements Camera {
  abstract projectPoint(hyperPoint: number[]): [number, number];
  projectGeometry(hyperGeometry) {
    const flatGeometry = Geometry.clone(hyperGeometry);
    const verticesLength = flatGeometry.vectors.length;

    for (let vertexId = 0; vertexId < verticesLength; ++vertexId) {
      if (undefined !== flatGeometry.vectors[vertexId]) {
        flatGeometry.vectors[vertexId] = this.projectPoint(flatGeometry.vectors[vertexId]);
      }
    }

    return flatGeometry;
  }
}
