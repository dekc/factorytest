import { useEffect, useState } from 'react';
import { Shape } from '../shapes/types';
import FactoryManager from '../shapes/FactoryManager';
import styled from 'styled-components';

const ParentContainer = styled.div`
  display: flex;
}`;

const ChildContainer = styled.div`
  flex: 1;
  padding: 1rem;
  border: 1px solid #ccc;
  margin: 1rem;
  border-radius: 0.5rem;
  background-color: #f5f5f5;
  box-shadow: 0 0 0.5rem #ccc;
}`;

const CenteredTextDiv = styled.div`
  display: flex;
  justify-content: center; // Horizontally center the content
  align-items: center; // Vertically center the content
  text-align: center; // Ensure text is centered
`;

const ErrorDiv = styled.div`
  color: darkred;
  border: 1px solid tomato;
  padding: 0.5rem;
  margin: 1rem;
  border-radius: 0.5rem;
  background-color: #f5151510;
  filter: blur(5px);
  transition: filter 0.3s ease-in-out;
  &:hover {
    filter: none;
  }
`;

const ConfigError = ({ errors }: { errors: string[] | null }) => {
  if (!errors || errors.length === 0) {
    return null;
  }

  return (
    <>
      <h3>There was an error processing the config</h3>
      <ErrorDiv>
        {errors.map((error: unknown, index: number) => (
          <p key={`${index}_`}>{error as string}</p>
        ))}
      </ErrorDiv>
    </>
  );
};

export interface ShapesProps {
  data: Shape[];
}

const factoryManager = FactoryManager.getInstance();

const Shapes = ({ data }: ShapesProps) => {
  const [shapes, errors] = useShapes(data);

  return (
    <>
      <h3>Shapes</h3>
      <ParentContainer title="JSON Shape Data">
        <ChildContainer>
          <CenteredTextDiv>JSON Data</CenteredTextDiv>
          <hr />
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </ChildContainer>

        <ChildContainer>
          <CenteredTextDiv>Shapes Data</CenteredTextDiv>
          <hr />
          <pre>{JSON.stringify(shapes, null, 2)}</pre>
        </ChildContainer>
      </ParentContainer>
      <ConfigError errors={errors} />
    </>
  );
};

const useShapes = (data: Shape[]) => {
  const [errors, setErrors] = useState<string[] | null>(null);
  const [shapes, setShapes] = useState<Shape[]>([]);

  useEffect(() => {
    const shapeErrors: string[] = [];
    const shapes = data
      .map((shape) => {
        try {
          return factoryManager.createShape(shape.type, shape);
        } catch (e) {
          const err = e as Error;
          shapeErrors.push(err.message);

          return null;
        }
      })
      .filter((shape) => shape !== null) as Shape[];

    setShapes(shapes);
    setErrors(shapeErrors);
  }, [data]);

  return [shapes, errors] as const;
};

export default Shapes;
