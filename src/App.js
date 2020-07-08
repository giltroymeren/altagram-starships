import React, { useState, useEffect } from 'react';
import axios from 'axios';


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
  // TODO: show API page 1 on load
  const [ starships, setStarships ] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ prevButtonState, setPrevButtonState ] = useState('');
  const [ nextButtonState, setNextButtonState ] = useState('');

  const handlePageClick = (action) => {
    console.log('action');
  }

  useEffect(() => {
    console.log(`CALLED: https://swapi.dev/api/starships/?page=${currentPage}`);
    axios.get(`https://swapi.dev/api/starships/?page=${currentPage}`)
      .then(response => {
        const data = response.data;
        console.log(data);

        setStarships(data.results);
        setPrevButtonState(data.previous === null ? 'disabled' : '');
        setNextButtonState(data.next ? '' : 'disabled');
      });
  });

  return (
    <div className="App">
      <footer>
        <button
          onClick={() => handlePageClick('prev')}
          disabled={prevButtonState}>Previous</button>
        <button
          onClick={() => handlePageClick('next')}
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
