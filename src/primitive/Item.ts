import { Angle } from '../math/Angle';
import { Geometry } from '../math/Geometry';
import { Matrix } from '../math/Matrix';
import { Vector } from '../math/Vector';
import { Material } from './Material';

type RotationsMap = { [axesKey: string]: number };

export class Item {

  private buffers: any;
  private scales: number[];
  private translations: number[];
  private rotations: RotationsMap;
  private matrix: Matrix;

  constructor(
    private geometry: Geometry,
    private material: Material,
    private data: any = {}
  ) {
    this.buffers = {};
    this.scales = [];
    this.translations = [];
    this.rotations = {};
  }

  static createAxesKey(axisA: number, axisB: number): string {
    return [axisA, axisB].sort().join('x');
  }

  static parseAxesKey(axesKey: string): [number, number] {
    return axesKey.split('x').map(Number) as [number, number];
  }

  getGeometry(): Geometry {
    return this.geometry;
  }

  getMaterial(): Material {
    return this.material;
  }

  getData(): any {
    return this.data;
  }

  getMatrix(): Matrix {
    return this.matrix;
  }

  hasMatrix(): boolean {
    return this.matrix !== undefined;
  }

  get<U = any>(key: string, defaultValue?: U): U | undefined {
    return this.data[key] === undefined ? defaultValue : this.data[key];
  }

  set<U = any>(key: string, value: U): this {
    this.data[key] = value;

    return this;
  }

  has(key: string): boolean {
    return undefined !== this.data[key];
  }

  remove(key: string): this {
    delete this.data[key];

    return this;
  }

  clear(): this {
    this.data = {};

    return this;
  }

  transform(matrix: Matrix): Geometry {
    return Geometry.transform(this.geometry, matrix);
  }

  apply(matrix: Matrix): this {
    this.geometry = this.transform(matrix);

    return this;
  }

  getTransformedGeometry(): Geometry {
    return this.hasMatrix() ? this.transform(this.getMatrix()) : this.getGeometry();
  }

  getScales(): number[] {
    return this.scales;
  }

  getScalesCanonic(): number[] {
    const dimension = this.geometry.getDimension();

    return Vector.build(dimension, 1.0).map(
      (defaultScale, dimension) =>
        this.scales[dimension] === undefined ? defaultScale : this.scales[dimension]
    );
  }

  getScale(dimension: number): number {
    return dimension in this.scales ? this.scales[dimension] : 1.0;
  }

  scale(scales: number[]): this {
    this.scales = scales.slice(0);

    return this;
  }

  getTranslations(): number[] {
    return this.translations;
  }

  getTranslationsCanonic(): number[] {
    const dimension = this.geometry.getDimension();

    return Vector.build(dimension, 0.0).map(
      (defaultTranslation, dimension) =>
        this.translations[dimension] === undefined ? defaultTranslation : this.translations[dimension]
    );
  }
  
  getTranslation(dimension: number): number {
    return this.translations[dimension];
  }

  translate(translations: number[]): this {
    this.translations = translations.slice(0);

    return this;
  }

  getRotations(): RotationsMap {
    return this.rotations;
  }

  getRotation(axisA: number, axisB: number): number {
    const axesKey = Item.createAxesKey(axisA, axisB);

    return axesKey in this.rotations ? this.rotations[axesKey] : 0.0;
  }

  rotate(rotations: RotationsMap): this {
    this.rotations = Object.assign({}, rotations);

    return this;
  }

  rotateAxis(axisA: number, axisB: number, theta: number): this {
    const axesKey = Item.createAxesKey(axisA, axisB);

    this.rotations[axesKey] = theta;

    return this;
  }

  update() {
    const rotations = this.rotations;
    const dimension = this.geometry.getDimension();
    const origin    = this.geometry.getOrigin();
    let axes, theta;

    const scaleVector = this.getScalesCanonic();
    const translationVector = this.getTranslationsCanonic();
    const rotationMatrices: Matrix[] = [];

    for (let axesKey in rotations) {
      axes = Item.parseAxesKey(axesKey);
      theta = rotations[axesKey];

      if (axes[0] < dimension) {
        rotationMatrices.push(
          Matrix.buildRotation(dimension, axes[0], axes[1], Angle.radians(theta), origin)
        );
      }
    }

    this.matrix = Matrix.compose(
      dimension,
      Matrix.buildScale(scaleVector),
      Matrix.buildTranslation(translationVector),
      rotationMatrices.length > 0 ? Matrix.multiplyBulk(rotationMatrices) : undefined
    );

    return this;
  }

  reset(): this {
    this.scales = [];
    this.translations = [];
    this.rotations = {};

    return this;
  }

  setBuffer(name: string, buffer: any): this {
    this.buffers[name] = buffer;

    return this;
  }

  getBuffer(name: string): any {
    return this.buffers[name];
  }

  hasBuffer(name: string): boolean {
    return name in this.buffers;
  }

  removeBuffer(name: string): this {
    delete this.buffers[name];

    return this;
  }

  clearBuffers(): this {
    this.buffers = {};

    return this;
  }
}
