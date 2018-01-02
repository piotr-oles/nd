import { Geometry, VertexId } from '../Math/Geometry';

type WalkCallback = (vertexId: VertexId, visited: VertexId[]) => boolean | undefined | null;

export function WalkAlgorithm(geometry: Geometry, vertexId: VertexId, callback: WalkCallback, visited: VertexId[] = []) {
  const siblings = geometry.getSiblings(vertexId);
  const siblingsLength = siblings.length;

  visited.push(vertexId);

  for (let i = 0; i < siblingsLength; ++i) {
    if (visited.length > 1 && visited[visited.length - 2] === siblings[i]) {
      continue;
    }

    if (-1 === visited.indexOf(siblings[i]) && false !== callback(siblings[i], visited)) {
      WalkAlgorithm(geometry, siblings[i], callback, visited.slice(0));
    }
  }
}
