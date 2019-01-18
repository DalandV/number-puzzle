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
    clickedTileIndex: null
  };

  componentDidMount = () => {
    console.log(`Empty space index on load: ${this.state.emptySpaceIndex}`);
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
          const test = () => {
            console.log(`You clicked tile ${tile.value}!`);
            console.log(`Clicked Tile Index: ${this.state.clickedTileIndex}`);
            console.log(`These two can be switched!`);
            this.swapArrayElements();
          };

          if (result === 3 || result === -3) {
            test();
          } else if (result === -1) {
            if (indexTwo !== 3 && indexTwo !== 6) {
              test();
            }
          } else if (result === 1) {
            if (indexTwo !== 2 && indexTwo !== 5) {
              test();
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
      console.log(
        `Clicked tile after set state: ${this.state.clickedTileIndex}`
      );
      console.log(`Empty Space Index: ${this.state.emptySpaceIndex}`);
      console.log(this.state.tiles);
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
