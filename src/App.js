import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const CONSTANTS = {
  disabled: 'disabled',
  next: 'next',
  prev: 'previous'
}

const Starship = ({ name, crew, passengers, hyperdrive}) => {
  const upperName = name.split(' ').map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(' ');
  const computedHyperdrive = (hyperdrive > 0 || !isNaN(hyperdrive)) ? ((hyperdrive / 6) * 100) : 0;

  return (
    <table className="starship">
      <tbody>
          <tr>
              <td className="heading">Name</td>
              <td>{upperName}</td>
          </tr>
          <tr>
              <td className="heading">Crew</td>
              <td>{crew < 1 ? 'None' : crew}</td>
          </tr>
          <tr>
              <td className="heading">Passengers</td>
              <td>{(passengers < 1) ? 'None' : passengers}</td>
          </tr>
          <tr>
              <td className="heading">Hyperdrive Class</td>
              <td>
                <progress max="100" value={computedHyperdrive}></progress>
              </td>
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

          document.title = `Starships - Page ${currentPage}`;
          setStarships(data.results);
          setIsLoading(false);
          setPrevButtonState(data.previous === null ? CONSTANTS.disabled : '');
          setNextButtonState(data.next ? '' : CONSTANTS.disabled);
        });
    }
  });

  return (
    <div className="App">
      <div className="list row">
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
      <footer>
        <div className="row">
          <button
            onClick={() => handlePageClick(CONSTANTS.prev)}
            disabled={prevButtonState}
            className="btn-prev">Previous</button>
          <button
            onClick={() => handlePageClick(CONSTANTS.next)}
            disabled={nextButtonState}
            className="btn-next">Next</button>
        </div>
      </footer>
    </div>
  );
}

export default App;
