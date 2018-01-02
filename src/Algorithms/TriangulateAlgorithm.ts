import { Geometry, Triangle, VertexId } from '../Math/Geometry';

// TODO: too naive algorithm :)
export function TriangulateAlgorithm(geometry: Geometry, face: VertexId[]): Triangle[] {
  const triangles = [];
  const start = face[0];

  for (let i = 1; i < face.length - 1; ++i) {
    triangles.push([start, face[i], face[i + 1]]);
  }

  return triangles;
}
