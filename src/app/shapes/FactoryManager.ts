import AbstractShapeFactory from './AbstractShapeFactory';
import CircleFactory from './CircleFactory';
import RectangleFactory from './RectangleFactory';
import TriangleFactory from './TriangleFactory';
import { ShapeType } from './types';

class FactoryManager {
  private factories: Map<ShapeType, AbstractShapeFactory> = new Map();
  static instance: FactoryManager;

  registerFactory(type: ShapeType, factory: AbstractShapeFactory) {
    this.factories.set(type, factory);
  }

  createShape(type: ShapeType, data: any) {
    const factory = this.factories.get(type);
    if (!factory) {
      throw new Error(`Shape type "${type}" not supported.`);
    }
    return factory.createShape(data);
  }

  static getInstance() {
    if (!FactoryManager.instance) {
      FactoryManager.instance = new FactoryManager();
    }
    return FactoryManager.instance;
  }
}

const factoryManager = FactoryManager.getInstance();

factoryManager.registerFactory('circle', new CircleFactory());
factoryManager.registerFactory('rectangle', new RectangleFactory());
factoryManager.registerFactory('triangle', new TriangleFactory());

export default FactoryManager;
