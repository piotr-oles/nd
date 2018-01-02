import { Geometry } from '../Math/Geometry';
import { Plane, PlaneEquation } from '../Math/Plane';
import { Set } from '../Math/Set';
import { TriangulateAlgorithm } from './TriangulateAlgorithm';
import { WalkAlgorithm } from './WalkAlgorithm';

export function FindFacesAlgorithm(geometry: Geometry, notifier: (geometry: Geometry) => void): void {
  geometry.clearTriangles();

  geometry.eachVertex((startVertexId) => {
    const foundCycles = [];
    let equation: PlaneEquation = null;

    WalkAlgorithm(geometry, startVertexId, function(currentVertexId, visited) {
      if (currentVertexId < startVertexId) {
        return false;
      }

      if (visited.length >= 3) {
        if (null === equation) {
          for (let combination of Set.combination(visited, 3)) {
            equation = Plane.buildEquation(
              geometry.getVector(combination[0]),
              geometry.getVector(combination[1]),
              geometry.getVector(combination[2])
            );

            if (null !== equation) {
              break;
            }
          }
        }

        if (null !== equation) {
          if (!Plane.satisfiesEquation(geometry.getVector(currentVertexId), equation)) {
            equation = null;
            return false;
          }
        }
      }

      if (visited.length >= 2) {
        if (
          -1 !== geometry.getSiblings(currentVertexId).indexOf(visited[0]) &&
          -1 === foundCycles.indexOf(currentVertexId)
        ) {
          const face = visited.concat([currentVertexId]);
          const triangles = TriangulateAlgorithm(geometry, face);

          for (let i = 0; i < triangles.length; ++i) {
            this.pushTriangle(triangles[i]);
          }

          foundCycles.push(visited[1]);

          return false;
        }
      }
    }, this);

    if (startVertexId % 4 === 0 && notifier) {
      notifier(geometry);
    }
  });

  if (notifier) {
    notifier(geometry);
  }
}
