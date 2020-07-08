import React from 'react';
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

class App extends React.Component {
  state = {
    starships: []
  }

  componentDidMount() {
    axios.get(`https://swapi.dev/api/starships/`)
      .then(response => {
        const data = response.data.results;
        console.log(data);
        this.setState({ starships: data });
      })
  }

  render() {
    return (
      <div className="App">
        {
          this.state.starships.map((ship, index) =>
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
}

export default App;
