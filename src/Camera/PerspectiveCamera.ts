
import { BasicCamera } from './BasicCamera';

export class PerspectiveCamera extends BasicCamera {
  constructor(private distance: number) {
    super();
  }

  projectPoint(hyperPoint) {
    const point = hyperPoint.slice(0);

    for (let d = point.length; d > 2; --d) {
      for (let i = 0; i < d - 1; ++i) {
        point[i] = (point[i] * this.distance) / (point[d - 1] + this.distance);
      }

      if (d > 3) {
        point.pop();
      }
    }

    for (let d = point.length; d < 3; ++d) {
      point.push(0);
    }

    return point;
  }
}
