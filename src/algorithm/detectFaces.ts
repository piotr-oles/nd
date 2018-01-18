import { Geometry } from '../math/Geometry';
import { Plane, PlaneEquation } from '../math/Plane';
import { Set } from '../math/Set';
import { triangulate } from './triangulate';
import { walk } from './walk';

export function detectFaces(geometry: Geometry): void {
  geometry.clearTriangles();

  geometry.eachVertex((startVertexId) => {
    const foundCycles = [];
    let equation: PlaneEquation = null;

    walk(geometry, startVertexId, (currentVertexId, visited) => {
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
          const triangles = triangulate(
            face,
            face.map(vertexId => geometry.getVector(vertexId)),
            geometry.getDimension()
          );
          for (let i = 0; i < triangles.length; ++i) {
            geometry.pushTriangle(triangles[i]);
          }

          foundCycles.push(visited[1]);

          return false;
        }
      }
    });
  });
}
