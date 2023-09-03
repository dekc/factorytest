type ShapeType = 'circle' | 'rectangle' | 'triangle';

interface BaseShape {
  type: ShapeType;
  color?: string;
}

interface Circle extends BaseShape {
  type: 'circle';
  radius: number;
}

interface Rectangle extends BaseShape {
  type: 'rectangle';
  width: number;
  height: number;
}

interface Triangle extends BaseShape {
  type: 'triangle';
  base: number;
  height: number;
}

type Shape = Circle | Rectangle | Triangle;

export { Circle, Rectangle, Triangle };
export type { ShapeType, Shape };
