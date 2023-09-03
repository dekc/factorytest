import { Triangle, Shape } from './types';

class TriangleFactory {
  createShape(data: Shape): Triangle {
    if (data.type !== 'triangle') {
      throw new Error('Shape type not supported');
    }
    if (!data.base || !data.height) {
      throw new Error('Invalid triangle data');
    }
    return { ...data, base: data.base * 100, height: data.height * 100 };
  }
}

export default TriangleFactory;
