
import { Vector } from './Vector';
import { Matrix } from './Matrix';

export type SerializedGeometry = {
  dimension: number;
  siblings: VertexId[][];
  vectors: Vector[];
  triangles: FlatTriangles;
  origin: Vector;
};

export type Vertex = {
  readonly siblings: ReadonlyArray<VertexId>;
  readonly vector: Vector
};
export type VertexId = number;
export type Triangle = [VertexId, VertexId, VertexId];
export type TrianglePointer = number;
export type FlatTriangles = VertexId[];
export type Edge = [VertexId, VertexId];

export type VectorMapper = (vector: Vector) => Vector;
export type VertexCallback = (vertexId: VertexId) => void | boolean;
export type EdgeCallback = (edge: Edge) => void | boolean;
export type TriangleCallback = (pointer: TrianglePointer) => void | boolean;

export class Geometry {
  private origin: Vector;

  static deserialize(serialized: SerializedGeometry): Geometry {
    return new Geometry(
      serialized.dimension,
      serialized.vectors,
      serialized.siblings,
      serialized.triangles,
      serialized.origin
    );
  }

  static serialize(geometry: Geometry): SerializedGeometry {
    return {
      dimension: geometry.dimension,
      siblings: geometry.siblings,
      vectors: geometry.vectors,
      triangles: geometry.triangles,
      origin: geometry.origin
    };
  }

  static transform(geometry: Geometry, matrix: Matrix): Geometry {
    const transformed = Geometry.clone(geometry);

    transformed.mapVectors(vector => Vector.transform(vector, matrix));

    return transformed;
  }

  static buildEmpty(): Geometry {
    const geometry = new Geometry(0);
    geometry.addVertex([]);

    return geometry;
  }

  static clone(sourceGeometry: Geometry, deep: boolean = false): Geometry {
    const targetGeometry = new Geometry(sourceGeometry.dimension);
    const sourceVectors = sourceGeometry.vectors;
    const sourceSiblings = sourceGeometry.siblings;
    const targetVectors = targetGeometry.vectors;
    const targetSiblings = targetGeometry.siblings;

    const verticesLength = sourceGeometry.vectors.length;

    for (let vertexId = 0; vertexId < verticesLength; ++vertexId) {
      targetVectors[vertexId] = sourceVectors[vertexId] ? sourceVectors[vertexId].slice(0) : undefined;

      if (deep) {
        targetSiblings[vertexId] = sourceSiblings[vertexId] ? sourceSiblings[vertexId].slice(0) : undefined;
      }
    }

    if (deep) {
      targetGeometry.triangles = sourceGeometry.triangles.slice(0);
    } else {
      targetGeometry.siblings = sourceGeometry.siblings;
      targetGeometry.triangles = sourceGeometry.triangles;
    }

    return targetGeometry;
  }

  constructor(
    private dimension: number,
    private vectors: Vector[] = [],
    private siblings: VertexId[][] = [],
    private triangles: FlatTriangles = [],
    private origin?: Vector
  ) {
    this.origin = origin || Vector.build(dimension, 0.0);
  }

  getDimension(): number {
    return this.dimension;
  }

  refreshDimension(): void {
    this.dimension = this.vectors.reduce((dimension, vector) => Math.max(dimension, vector.length), 0);
  }

  getOrigin(): Vector {
    return this.origin;
  }

  updateOrigin(updater: (origin: Vector) => Vector): void {
    this.origin = updater(this.origin);
  }

  addVertex(vector: Vector, siblings: VertexId[] = []): VertexId {
    const vertexId = this.vectors.length;
    const vertexKey = Vector.toString(vector);

    this.siblings.push(siblings);
    this.vectors.push(vector);

    return vertexId;
  }

  getVertex(vertexId: VertexId): Vertex {
    return {
      siblings: this.siblings[vertexId],
      vector: this.vectors[vertexId]
    };
  }

  getVector(vertexId: VertexId): Vector {
    return this.vectors[vertexId];
  }

  setVector(vertexId: VertexId, vector: Vector): void {
    this.vectors[vertexId] = vector;
  }

  updateVector(vertexId: VertexId, updater: (vector: Vector) => Vector): void {
    this.vectors[vertexId] = updater(this.vectors[vertexId]);
  }

  getSiblings(vertexId: VertexId): VertexId[] {
    return this.siblings[vertexId];
  }

  setSiblings(vertexId: VertexId, siblings: VertexId[]): void {
    this.siblings[vertexId] = siblings;
  }

  updateSiblings(vertexId: VertexId, updater: (siblings: VertexId[]) => VertexId[]): void {
    this.siblings[vertexId] = updater(this.siblings[vertexId]);
  }

  removeVertex(vertexId: VertexId): void {
    const vertexKey = Vector.toString(this.vectors[vertexId]);
    const vertexSiblings = this.siblings[vertexId];
    const vertexSiblingsLength = vertexSiblings.length;

    for (let i = 0; i < vertexSiblingsLength; ++i) {
      let siblingId = vertexSiblings[i];

      this.siblings[siblingId] = this.siblings[siblingId]
        .filter(siblingId => siblingId !== vertexId);
    }

    this.siblings[vertexId] = undefined;
    this.vectors[vertexId] = undefined;
  }

  mergeVertices(vertexIdA: VertexId, vertexIdB: VertexId): VertexId {
    const diff = this.siblings[vertexIdB].filter(
      (siblingId) => -1 === this.siblings[vertexIdA].indexOf(siblingId)
    );

    this.siblings[vertexIdA] = this.siblings[vertexIdA].concat(diff);
    this.removeVertex(vertexIdB);

    return vertexIdA;
  }

  countVertices(): number {
    return this.vectors.length;
  }

  countTriangles(): number {
    return Math.floor(this.triangles.length / 3);
  }

  addEdge([vertexIdA, vertexIdB]: Edge): void {
    this.siblings[vertexIdA].push(vertexIdB);
    this.siblings[vertexIdB].push(vertexIdA);
  }

  removeEdge([vertexIdA, vertexIdB]: Edge): void {
    this.siblings[vertexIdA] = this.siblings[vertexIdA].filter(siblingId => siblingId !== vertexIdB);
    this.siblings[vertexIdB] = this.siblings[vertexIdB].filter(siblingId => siblingId !== vertexIdA);
  }

  pushTriangle([vertexIdA, vertexIdB, vertexIdC]: Triangle): void {
    this.triangles.push(vertexIdA, vertexIdB, vertexIdC);
  }

  unshiftTriangle([vertexIdA, vertexIdB, vertexIdC]: Triangle): void {
    this.triangles.unshift(vertexIdA, vertexIdB, vertexIdC);
  }

  shiftTriangle(): Triangle {
    return [
      this.triangles.shift(),
      this.triangles.shift(),
      this.triangles.shift()
    ];
  }

  getTriangle(pointer: number): Triangle {
    return [
      this.triangles[pointer],
      this.triangles[pointer + 1],
      this.triangles[pointer + 2]
    ];
  }

  mapVectors(mapper: VectorMapper): void {
    this.vectors = this.vectors.map(mapper);
  }

  eachVertex(callback: VertexCallback): void {
    const verticesLength = this.vectors.length;

    for (let vertexId = 0; vertexId < verticesLength; ++vertexId) {
      if (
        undefined !== this.vectors[vertexId] &&
        false === callback(vertexId)
      ) {
        break;
      }
    }
  }

  eachEdge(callback: EdgeCallback): void {
    const siblings = this.siblings;
    const verticesLength = this.vectors.length;

    for (let vertexId = 0; vertexId < verticesLength; ++vertexId) {
      if (undefined !== this.vectors[vertexId]) {
        let vertexSiblings = this.siblings[vertexId];
        let vertexSiblingsLength = vertexSiblings.length;

        for (let i = 0; i < vertexSiblingsLength; ++i) {
          if (
            vertexSiblings[i] > vertexId &&
            false === callback([vertexId, vertexSiblings[i]]))
          {
            break;
          }
        }
      }
    }
  }

  eachTriangle(callback: TriangleCallback): void {
    const trianglesLength = this.triangles.length;

    for (let trianglePointer = 0; trianglePointer < trianglesLength; trianglePointer += 3) {
      if (false === callback(trianglePointer)) {
        break;
      }
    }
  }

  clearTriangles(): void {
    this.triangles = [];
  }
}
