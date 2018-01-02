import { Geometry } from '../Math/Geometry';
import { Vector } from '../Math/Vector';

export function ExpandByPermutationAlgorithm(geometry: Geometry, A: number, B: number, notifier: (geometry: Geometry) => void) {
  const dimension = geometry.getDimension();
  const vectorA = Vector.build(dimension, 0);
  const vectorB = Vector.build(dimension, 0);

  vectorA.push(A);
  vectorB.push(B);

  const vertexA = geometry.addVertex(vectorA);
  const vertexB = geometry.addVertex(vectorB);

  geometry.eachVertex((vertexId) => {
    if (vertexId === vertexA || vertexId === vertexB) {
      return;
    }

    geometry.updateVector(vertexId, vector => [...vector, 0]);
    geometry.addEdge([vertexA, vertexId]);
    geometry.addEdge([vertexB, vertexId]);

    if (notifier) {
      notifier(geometry);
    }
  });

  geometry.updateOrigin(origin => [...origin, (A + B) / 2]);
  geometry.refreshDimension();
}
