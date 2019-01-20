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
    tiles: tiles,
    emptySpaceIndex: tiles.findIndex(x => x.id === 0),
    clickedTileIndex: null,
    youWon: [
      { id: 1, value: 1 },
      { id: 2, value: 2 },
      { id: 3, value: 3 },
      { id: 4, value: 4 },
      { id: 5, value: 5 },
      { id: 6, value: 6 },
      { id: 7, value: 7 },
      { id: 8, value: 8 },
      { id: 0, value: 0 }
    ]
  };

  // TEMPORARY
  // .sort(function(a, b) {
  //   return 0.5 - Math.random();
  // })

  winChecker = () => {
    const check =
      JSON.stringify(this.state.tiles) === JSON.stringify(this.state.youWon);
    if (check === true) {
      console.log(`Congrats you win!!!!`);
    }
  };

  handleTileClick = tile => {
    if (tile.id > 0) {
      this.setState(
        {
          clickedTileIndex: tiles.findIndex(x => x.id === tile.id)
        },
        () => {
          const indexOne = this.state.emptySpaceIndex;
          const indexTwo = this.state.clickedTileIndex;
          const result = indexOne - indexTwo;

          if (result === 3 || result === -3) {
            this.swapArrayElements();
          } else if (result === -1) {
            if (indexTwo !== 3 && indexTwo !== 6) {
              this.swapArrayElements();
            }
          } else if (result === 1) {
            if (indexTwo !== 2 && indexTwo !== 5) {
              this.swapArrayElements();
            }
          }
        }
      );
    }
  };

  swapArrayElements = () => {
    const tilesV = this.state.tiles;
    const eSIV = this.state.emptySpaceIndex;
    const cTIV = this.state.clickedTileIndex;

    const temp = tilesV[eSIV];
    tilesV[eSIV] = tilesV[cTIV];
    tilesV[cTIV] = temp;

    this.setState({ emptySpaceIndex: cTIV }, () => {
      this.winChecker();
    });
  };

  handleStyleClasses = tile => {
    const classes = [];

    if (tile.id === 0) {
      classes.length = 0;
      classes.push("empty-tile");
      return classes;
    } else {
      classes.length = 0;
      classes.push("tile");
      return classes;
    }
  };

  renderNumSpan = tile => {
    if (tile.id === 0) {
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
              key={tile.id}
              tileObject={tile}
              class={this.handleStyleClasses(tile)}
              handleTileClick={this.handleTileClick}
            >
              {this.renderNumSpan(tile)}
            </Tile>
          ))}
        </Gameboard>
        <Footer />
      </Wrapper>
    );
  }
}

export default App;
