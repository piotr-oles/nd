import { Triangle, VertexId } from '../math/Geometry';
import * as earcut from 'earcut';
import { Vector } from '../math/Vector';

// TODO: too naive algorithm :)
export function triangulate(face: VertexId[], vectors: Vector[], dimension: number): Triangle[] {
  const triangles = [];
  const start = face[0];

  for (let i = 1; i < face.length - 1; ++i) {
    triangles.push([start, face[i], face[i + 1]]);
  }

  return triangles;
}

// TODO: fix some missing faces
export function triangulatev2(face: VertexId[], vectors: Vector[], dimension: number): Triangle[] {
  // perform triangulation
  const flatTriangles: number[] = earcut(
    vectors.reduce((flatten, vector) => [...flatten, ...vector], []),
    null,
    dimension
  );
  const triangles: Triangle[] = [];

  // iterate over triangles
  for (let i = 0; i < flatTriangles.length; i += 3) {
    triangles.push([
      face[flatTriangles[i]],
      face[flatTriangles[i + 1]],
      face[flatTriangles[i + 2]]
    ]);
  }

  return triangles;
}
