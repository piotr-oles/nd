
import { Geometry } from '../math/Geometry';
import { FlatPoint, HyperPoint } from './Point';

export interface Camera {
  projectPoint(hyperPoint: HyperPoint): FlatPoint
  projectGeometry(hyperGeometry: Geometry): Geometry
}
