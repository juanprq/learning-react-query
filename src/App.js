import React, { useState } from 'react';
import NavBar from './components/NavBar';
import Planets from './components/Planets';
import People from './components/People';

function App() {
  const [page, setPage] = useState('planets');

  return (
    <div className="App">
      <h1>
        Star Wars info
      </h1>
      <NavBar onPlanetsClick={() => setPage('planets')} onPeopleClick={() => setPage('people')} />
      <div className="content">
        { page === 'planets' ? <Planets /> : <People /> }
      </div>
    </div>
  );
}

export default App;
