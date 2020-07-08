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
  // TODO: default page 1 in state
  state = {
    starships: [],
    currentPage: 1,
    prevButtonState: '',
    nextButtonState: '',
  }

  // method to handle call to pages
  // NOTE: do we need async-await here?
  handlePageClick = (action) => {
    const nextPage = (action === 'next') ? this.state.currentPage + 1 : this.state.currentPage - 1;
    console.log(`ACTION: ${action}, CURRENT: ${this.state.currentPage}, NEXT: ${nextPage}`);
    this.setState({ currentPage: nextPage });
    if(nextPage < 1) {
      this.setState({ prevButtonState: 'disabled' });
      return;
    }

    // TODO: disabled next button if 404
    console.log(`CALLED: https://swapi.dev/api/starships/?page=${nextPage}`);
    axios.get(`https://swapi.dev/api/starships/?page=${nextPage}`)
      .then(response => {
        const data = response.data.results;
        console.log(data);
        this.setState({
          starships: data,
          prevButtonState: ''
        });
      })
      .catch(error => {
        console.log(`Message: ${error}`);
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
        <footer>
          <button
            onClick={() => this.handlePageClick('prev')}
            disabled={this.state.prevButtonState}>Previous</button>
          <button
            onClick={() => this.handlePageClick('next')}
            disabled={this.state.nextButtonState}>Next</button>
        </footer>
      </div>
    );
  }
}

export default App;
