import React, { useState } from 'react';
import { usePaginatedQuery } from 'react-query';

import Planet from './Planet';

const fetchPlanets = async (key, page) => {
  // we can receive the parameters of the query
  console.log(page);

  const response = await fetch(`http://swapi.dev/api/planets?page=${page}`);
  return response.json();
};

const Planets = () => {
  const [page, setPage] = useState(1);
  const { resolvedData, latestData, status } = usePaginatedQuery(
    ['planets', page],
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
          <>
            <button disabled={page === 1} onClick={() => setPage((currentPage) => Math.max(currentPage - 1, 1))}>Previous page</button>
            <span>{page}</span>
            <button disabled={!latestData || !latestData.next} onClick={() => setPage((currentPage) => (!latestData || !latestData.next ? currentPage : currentPage + 1))}>Next page</button>
            <div>
              {
                resolvedData.results.map(planet => (
                  <Planet key={planet.name} planet={planet} />
                ))
              }
            </div>
          </>
        )
      }
    </div>
  );
};

export default Planets;
