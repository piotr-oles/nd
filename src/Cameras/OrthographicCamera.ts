import { BasicCamera } from './BasicCamera';

export class OrthographicCamera extends BasicCamera {
  projectPoint(hyperPoint) {
    const point = hyperPoint.slice(0);

    for (let d = point.length; d > 3; --d) {
      point.pop();
    }

    for (let d = point.length; d < 3; ++d) {
      point.push(0);
    }

    point[2] = 1;

    return point;
  }
}
