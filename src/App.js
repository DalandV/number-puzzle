import React from 'react';
import Wrapper from './components/Wrapper'
import Navbar from './components/Navbar';
import Gameboard from './components/Gameboard';
import Tile from './components/Tile';
import Footer from './components/Footer';
import tiles from './tiles.json'

class App extends React.Component {
  state = {
    tiles: tiles.sort(function (a, b) { return 0.5 - Math.random() }),
    emptyTileID: tiles.findIndex(x => x.id === 0),
    // clickedTileID: 
  };

  componentDidMount = () => {
    console.log(this.state.emptyTileID)
  }

  tileClick = (clickedTile) => {

    function idZero(object) {
      return object.id === 0
    }
    const index1 = this.state.tiles.findIndex(idZero);

    const index2 = this.state.tiles.indexOf(clickedTile);

    const result = index1 - index2

    if (result === 3 || result === -3) {
      console.log(`Result equals ${result}. These two can be switched :)`);
      console.log(clickedTile.id);
      this.setState({ emptyTileID: clickedTile.id })
    }
    else if (result === -1) {
      if (index2 === 3 || index2 === 6) {
        console.log(`index2 equals ${index2} and the result = ${result}. These two can not be switched :(`);
      }
      else {
        console.log(`Result equals ${result}. These two can be switched :)`);
        console.log(clickedTile.id);
        this.setState({ emptyTileID: clickedTile.id })
      }
    }
    else if (result === 1) {
      if (index2 === 2 || index2 === 5) {
        console.log(`index2 equals ${index2} and the result = ${result}. These two can not be switched :(`);
      }
      else {
        console.log(`Result equals ${result}. These two can be switched :)`);
        console.log(clickedTile.id);
        this.setState({ emptyTileID: clickedTile.id })
      }
    }
  }

  render() {
    return (
      <Wrapper>
        <Navbar />
        <Gameboard>
          {this.state.tiles.map(tile => (
            <Tile
              id={tile.id}
              key={tile.id}
              value={tile.value}
              tileData={tile}
              tileClick={this.tileClick}
            />
          ))}
        </Gameboard>
        <Footer />
      </Wrapper>
    );
  }
}

export default App;
