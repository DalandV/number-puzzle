import React from 'react';
import './App.css'
import Wrapper from './components/Wrapper'
import Navbar from './components/Navbar';
import Gameboard from './components/Gameboard';
import Tile from './components/Tile';
import NumSpan from './components/NumSpan';
import Footer from './components/Footer';
import tiles from './tiles.json'

class App extends React.Component {
  state = {
    tiles: tiles.sort(function (a, b) { return 0.5 - Math.random() }),
    emptySpaceIndex: tiles.findIndex(x => x.id === 0),
    clickedTileIndex: null,
    slidTileIndex: null,
    switchable: false
    // slidTileValue: null
  };

  componentDidMount = () => {
    console.log(`Empty Space Index: ${this.state.emptySpaceIndex}`)
  }

  tileClick = (clickedTileObject, emptySpaceObject) => {

    this.setState(
      {
        clickedTileIndex: tiles.findIndex(x => x.id === clickedTileObject.id)
      }, () => {
        // this.setState({ slidTileValue: tiles[this.state.clickedTileIndex].value }, ()=>{
        //   console.log(`Slid Tile Value: ${this.state.slidTileValue}`)
        // })
        console.log(`Clicked Tile Index: ${this.state.clickedTileIndex}`);
        // console.log(`Empty Space Object:\n{id: ${emptySpaceObject.id}, value: ${emptySpaceObject.value}}`)

        const index1 = this.state.emptySpaceIndex;

        const index2 = this.state.clickedTileIndex;

        const result = index1 - index2;

        // const slidValue = clickedTileObject.value;

        const slideTile = () => {
          // this.setState({ emptySpaceIndex: this.state.clickedTileIndex })
          this.setState({ switchable: true, emptySpaceIndex: this.state.clickedTileIndex, slidTileIndex: this.state.clickedTileIndex + result }, () => {
            console.log(`Slid Tile Index: ${this.state.slidTileIndex}`);
            this.setState({ switchable: false });
          });
        }


        if (result === 3 || result === -3) {
          console.log(`Result equals ${result}. These two can be switched :)`);
          slideTile()
        }
        else if (result === -1) {
          if (index2 !== 3 && index2 !== 6) {
            console.log(`Result equals ${result}. These two can be switched :)`);
            slideTile()
          }
        }
        else if (result === 1) {
          if (index2 !== 2 && index2 !== 5) {
            console.log(`Result equals ${result}. These two can be switched :)`);
            slideTile()
          }
        }
        else {
          this.setState({ switchable: false })
        }
      })
  }

  chooseClass = (tile) => {
    const classes = [];
    if (this.state.tiles.indexOf(tile) === this.state.emptySpaceIndex) {
      classes.length = 0;
      classes.push("empty-tile");
      return classes
    }
    else {
      classes.length = 0;
      classes.push("tile")
      return classes
    }
  }

  chooseValue = (tile) => {
    if (this.state.tiles.indexOf(tile) === this.state.slidTileIndex && this.state.switchable === true) {
      console.log(`Value to be switched: ${this.state.tiles[this.state.clickedTileIndex].value}`);
      return this.state.tiles[this.state.clickedTileIndex].value
    }
    else {
      // console.log(`goodbye`)
      return tile.value
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
              tileObject={tile}
              tileClick={this.tileClick}
              class={this.chooseClass}
              emptySpaceObject={this.state.tiles[this.state.emptySpaceIndex]}
            >
              {this.state.tiles.indexOf(tile) === this.state.emptySpaceIndex ? null
                : <NumSpan value={this.chooseValue(tile)} />}
            </Tile>
          ))}
        </Gameboard>
        <Footer />
      </Wrapper>
    );
  }
}

export default App;
