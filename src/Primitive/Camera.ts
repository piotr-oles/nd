
import { HyperPoint, Point } from './Point';

export interface Camera {
  projectPoint(hyperPoint: HyperPoint): Point
  projectGeometry(hyperGeometry): any
}
