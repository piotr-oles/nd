import { BasicCamera } from './BasicCamera';

export class HybridCamera extends BasicCamera {
  constructor(private distance: number) {
    super();
  }

  projectPoint(hyperPoint) {
    const point = hyperPoint.slice(0);

    // ortogonal for hyper dimensions
    for (let d = point.length; d > 3; --d) {
      point.pop();
    }

    // perspective for 3th dimension
    if (point.length === 3) {
      point[0] = (point[0] * this.distance) / (point[2] + this.distance);
      point[1] = (point[1] * this.distance) / (point[2] + this.distance);
    }

    for (let d = point.length; d < 3; ++d) {
      point.push(0);
    }

    return point;
  }
}
