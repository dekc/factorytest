import { Circle, Shape } from './types';

class CircleFactory {
  createShape(data: Circle): Circle {
    return {
      type: 'circle',
      radius: data.radius * 100,
      color: 'red',
    };
  }
}

export default CircleFactory;
