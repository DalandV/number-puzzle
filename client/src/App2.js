import React, { Component } from "react";
import "./App.css";
import Wrapper from "./components/Wrapper";
import Navbar from "./components/Navbar";
import Gameboard from "./components/Gameboard";
import Tile from "./components/Tile";
import NumSpan from "./components/NumSpan";
import Footer from "./components/Footer";
import tiles from "./tiles.json";

class App extends Component {
  state = {
    tiles: tiles.sort(function(a, b) {
      return 0.5 - Math.random();
    }),
    emptySpaceIndex: tiles.findIndex(x => x.id === 0),
    clickedTileIndex: null,
    indexAfterClick: null
  };

  tileClick = clickedTileObject => {
    this.setState(
      { clickedTileIndex: tiles.findIndex(x => x.id === clickedTileObject.id) },
      () => {
        const index1 = this.state.emptySpaceIndex;
        const index2 = this.state.clickedTileIndex;
        const result = index1 - index2;

        const slideTile = () => {
          this.setState({ tiles: this.swapArrayElements() }, () => {
            console.log(this.state.tiles);
          });
        };

        if (result === 3 || result === -3) {
          slideTile();
        } else if (result === -1) {
          if (index2 !== 3 && index2 !== 6) {
            slideTile();
          }
        } else if (result === 1) {
          if (index2 !== 2 && index2 !== 5) {
            slideTile();
          }
        }
      }
    );
  };
  // switchArray = () => {
  //   const { variable } = this.state;
  //   const { array } = this.state;
  //   console.log(array);

  //   const switchA = () => {
  //     const temp = array[1];
  //     array[1] = array[3];
  //     array[3] = temp;
  //   };

  //   this.setState({ array: switchA() }, () => {
  //     console.log(array);
  //   });
  // };
  swapArrayElements = () => {
    const { tiles } = this.state;
    const { emptySpaceIndex } = this.state;
    const { clickedTileIndex } = this.state;

    const temp = tiles[emptySpaceIndex];
    tiles[emptySpaceIndex] = tiles[clickedTileIndex];
    tiles[clickedTileIndex] = temp;
    return tiles;
  };

  chooseClass = tile => {
    const classes = [];
    if (this.state.tiles.indexOf(tile) === this.state.emptySpaceIndex) {
      classes.length = 0;
      classes.push("empty-tile");
      return classes;
    } else {
      classes.length = 0;
      classes.push("tile");
      return classes;
    }
  };

  handleNumSpan = tile => {
    if (
      this.state.tiles.indexOf(tile) === this.state.emptySpaceIndex ||
      this.state.tiles.indexOf(tile) === this.state.clickedTileIndex
    ) {
      console.log(`Empty Space Index: ${this.state.emptySpaceIndex}`);
      console.log(`${this.state.tiles.indexOf(tile)}`);
      return null;
    } else {
      return <NumSpan value={tile.value} />;
    }
  };

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
            >
              {this.handleNumSpan(tile)}
            </Tile>
          ))}
        </Gameboard>
        <Footer />
      </Wrapper>
    );
  }
}

export default App;
