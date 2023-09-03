import { Shape } from './types';

abstract class AbstractShapeFactory {
  abstract createShape(data: Shape): Shape;
}

export default AbstractShapeFactory;
