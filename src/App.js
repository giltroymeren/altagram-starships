import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CONSTANTS = {
  disabled: 'disabled',
  next: 'next',
  prev: 'previous'
}

const Starship = ({ name, crew, passengers, hyperdrive}) => {
  return (
    <table>
      <tbody>
          <tr>
              <td>Name</td>
              <td>{name}</td>
          </tr>
          <tr>
              <td>Crew</td>
              <td>{crew}</td>
          </tr>
          <tr>
              <td>Passengers</td>
              <td>{passengers === 'n/a' ? 'None' : passengers}</td>
          </tr>
          <tr>
              <td>Hyperdrive Class</td>
              <td>{((hyperdrive / 6) * 100).toFixed(2)}%</td>
          </tr>
      </tbody>
</table>
  );
}

const App = () => {
  const [ starships, setStarships ] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ prevButtonState, setPrevButtonState ] = useState('');
  const [ nextButtonState, setNextButtonState ] = useState('');

  const handlePageClick = (action) => {
    setIsLoading(true);
    setCurrentPage((action === CONSTANTS.next) ? currentPage + 1 : currentPage - 1);
  }

  useEffect(() => {
    if(isLoading) {
      axios.get(`https://swapi.dev/api/starships/?page=${currentPage}`)
        .then(response => {
          const data = response.data;

          setStarships(data.results);
          setIsLoading(false);
          setPrevButtonState(data.previous === null ? CONSTANTS.disabled : '');
          setNextButtonState(data.next ? '' : CONSTANTS.disabled);
        });
    }
  });

  return (
    <div className="App">
      <footer>
        <button
          onClick={() => handlePageClick(CONSTANTS.prev)}
          disabled={prevButtonState}>Previous</button>
        <button
          onClick={() => handlePageClick(CONSTANTS.next)}
          disabled={nextButtonState}>Next</button>
      </footer>
      {
        starships.map((ship, index) =>
          <Starship
            key={index}
            name={ship.name}
            crew={ship.crew}
            passengers={ship.passengers}
            hyperdrive={ship.hyperdrive_rating} />)
      }
    </div>
  );
}

export default App;
