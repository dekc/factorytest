import { Rectangle, Shape } from './types';

class RectangleFactory {
  createShape(data: Shape): Rectangle {
    if (data.type !== 'rectangle') {
      throw new Error('Shape type not supported');
    }
    if (!data.width || !data.height) {
      throw new Error('Invalid rectangle data');
    }
    return {
      ...data,
      width: data.width * 100,
      height: data.height * 100,
    };
  }
}

export default RectangleFactory;
