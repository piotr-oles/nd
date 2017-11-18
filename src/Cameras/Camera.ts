
import { HyperPoint, Point } from '../Primitives/Point';

export interface Camera {
  projectPoint(hyperPoint: HyperPoint): Point
  projectGeometry(hyperGeometry): any
}
