import React, { useState } from 'react';
import { useQuery } from 'react-query';

import Planet from './Planet';

const fetchPlanets = async (key, greetings, page) => {
  // we can receive the parameters of the query
  console.log(greetings, page);
  console.log(page);

  const response = await fetch(`http://swapi.dev/api/planets?page=${page}`);
  return response.json();
};

const Planets = () => {
  const [page, setPage] = useState(1);
  const { data, status } = useQuery([
      'planets',
      'hello ninjas',
      page,
    ],
    fetchPlanets,
    {
      staleTime: 0,
      // cacheTime: 10000,
      onSuccess: () => console.log('data fetched correctly'),
      onError: () => console.log('error fetching data'),
    },
  );

  return (
    <div>
      <h2>Planets</h2>

      <button onClick={() => setPage(1)}>Page 1</button>
      <button onClick={() => setPage(2)}>Page 2</button>
      <button onClick={() => setPage(3)}>Page 3</button>
      {
        status === 'error' && (
          <div>Error fetching data</div>
        )
      }
      {
        status === 'loading' && (
          <div>Loading data</div>
        )
      }
      {
        status === 'success' && (
          <div>
            {
              data.results.map(planet => (
                <Planet key={planet.name} planet={planet} />
              ))
            }
          </div>
        )
      }
    </div>
  );
};

export default Planets;
