import React from 'react';
import { useQuery } from 'react-query';

import Person from './Person';

const fetchPeople = async () => {
  const response = await fetch('http://swapi.dev/api/people');
  return response.json();
};

const Planets = () => {
  const { data, status } = useQuery('people', fetchPeople);

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
              data.results.map(person => (
                <Person key={person.name} person={person} />
              ))
            }
          </div>
        )
      }
    </div>
  );
};

export default Planets;
