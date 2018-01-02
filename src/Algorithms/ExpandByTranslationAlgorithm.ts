import { Geometry } from '../Math/Geometry';

export function ExpandByTranslationAlgorithm(
  geometry: Geometry,
  A: number,
  B: number,
  notifier: (geometry: Geometry) => void
): void {
  const translationMap = {};

  geometry.eachVertex((sourceVertexId) => {
    const sourceVector = geometry.getVector(sourceVertexId);

    const targetVector = sourceVector.slice(0);
    const targetVertexId = geometry.addVertex(targetVector, []);

    sourceVector.push(A);
    targetVector.push(B);

    translationMap[sourceVertexId] = targetVertexId;

    if (notifier) {
      notifier(geometry);
    }
  });

  Object.keys(translationMap).map((sourceVertexKey) => {
    const sourceVertexId = Number(sourceVertexKey);
    const targetVertexId = translationMap[sourceVertexId];
    const sourceSiblings = geometry.getSiblings(sourceVertexId);

    geometry.setSiblings(
      targetVertexId,
      sourceSiblings.map((siblingId) => translationMap[siblingId])
    );
    geometry.addEdge([sourceVertexId, targetVertexId]);

    if (notifier) {
      notifier(geometry);
    }
  });

  geometry.updateOrigin(origin => [...origin, (A + B) / 2]);
  geometry.refreshDimension();
}
