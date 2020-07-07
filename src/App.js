import React from 'react';
import { render } from '@testing-library/react';

const data = [
  {
      "name": "CR90 corvette",
      "model": "CR90 corvette",
      "manufacturer": "Corellian Engineering Corporation",
      "cost_in_credits": "3500000",
      "length": "150",
      "max_atmosphering_speed": "950",
      "crew": "30-165",
      "passengers": "600",
      "cargo_capacity": "3000000",
      "consumables": "1 year",
      "hyperdrive_rating": "2.0",
      "MGLT": "60",
      "starship_class": "corvette",
      "pilots": [],
      "films": [
          "http://swapi.dev/api/films/1/",
          "http://swapi.dev/api/films/3/",
          "http://swapi.dev/api/films/6/"
      ],
      "created": "2014-12-10T14:20:33.369000Z",
      "edited": "2014-12-20T21:23:49.867000Z",
      "url": "http://swapi.dev/api/starships/2/"
  },
  {
      "name": "Star Destroyer",
      "model": "Imperial I-class Star Destroyer",
      "manufacturer": "Kuat Drive Yards",
      "cost_in_credits": "150000000",
      "length": "1,600",
      "max_atmosphering_speed": "975",
      "crew": "47,060",
      "passengers": "n/a",
      "cargo_capacity": "36000000",
      "consumables": "2 years",
      "hyperdrive_rating": "2.0",
      "MGLT": "60",
      "starship_class": "Star Destroyer",
      "pilots": [],
      "films": [
          "http://swapi.dev/api/films/1/",
          "http://swapi.dev/api/films/2/",
          "http://swapi.dev/api/films/3/"
      ],
      "created": "2014-12-10T15:08:19.848000Z",
      "edited": "2014-12-20T21:23:49.870000Z",
      "url": "http://swapi.dev/api/starships/3/"
  },
  {
      "name": "Sentinel-class landing craft",
      "model": "Sentinel-class landing craft",
      "manufacturer": "Sienar Fleet Systems, Cyngus Spaceworks",
      "cost_in_credits": "240000",
      "length": "38",
      "max_atmosphering_speed": "1000",
      "crew": "5",
      "passengers": "75",
      "cargo_capacity": "180000",
      "consumables": "1 month",
      "hyperdrive_rating": "1.0",
      "MGLT": "70",
      "starship_class": "landing craft",
      "pilots": [],
      "films": [
          "http://swapi.dev/api/films/1/"
      ],
      "created": "2014-12-10T15:48:00.586000Z",
      "edited": "2014-12-20T21:23:49.873000Z",
      "url": "http://swapi.dev/api/starships/5/"
  }
];

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

function App() {
  return (
    <div className="App">
      {
        data.map(ship =>
          <Starship
            name={ship.name}
            crew={ship.crew}
            passengers={ship.passengers}
            hyperdrive={ship.hyperdrive_rating} />)
      }
    </div>
  );
}

export default App;
