import styled from 'styled-components';

import Shapes from './components/Shapes';
import { useEffect, useState } from 'react';
import { Shape } from './shapes/types';

const API_URL = import.meta.env.VITE_API_URL;

const StyledApp = styled.div`
  // Your style here
`;

const useData = () => {
  const [data, setData] = useState<Shape[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(`${API_URL}/config`);
      const json = await response.json();
      setData(json);
      setLoading(false);
    };
    fetchData();
  }, []);

  return [data, loading] as const;
};

function App() {
  const [data, loading] = useData();

  if (loading) {
    return <div>Loading...</div>;
  }

  return <StyledApp>{!loading && <Shapes data={data} />}</StyledApp>;
}

export default App;
