import React from 'react';
import { useQuery } from 'react-query';

import Planet from './Planet';

const fetchPlanets = async () => {
  const response = await fetch('http://swapi.dev/api/planets');
  return response.json();
};

const Planets = () => {
  const { data, status } = useQuery(
    'planets',
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
