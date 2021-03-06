import React, { Component } from "react";
import "./App.css";
import Wrapper from "./components/Wrapper";
import ModalRS from "./components/Modal";
import Navbar from "./components/Navbar";
import Gameboard from "./components/Gameboard";
import Tile from "./components/Tile";
import NumSpan from "./components/NumSpan";
import Footer from "./components/Footer";
import tilesArray from "./tiles.json";

class App extends Component {
  state = {
    tilesOnBoard: tilesArray.sort(function(a, b) {
      return 0.5 - Math.random();
    }),
    winningPattern: [
      { id: 1, value: 1 },
      { id: 2, value: 2 },
      { id: 3, value: 3 },
      { id: 4, value: 4 },
      { id: 5, value: 5 },
      { id: 6, value: 6 },
      { id: 7, value: 7 },
      { id: 8, value: 8 },
      { id: 0, value: 0 }
    ],
    didUserWin: false,
    name: ""
  };

  handleTileClick = tile => {
    // Finds index of the tile with an id of 0
    const emptySpaceIndex = this.state.tilesOnBoard.findIndex(x => x.id === 0);
    // Finds index of the tile with an id equal to the tileObject passed in through props in Tile component
    const clickedTileIndex = this.state.tilesOnBoard.findIndex(
      x => x.id === tile.id
    );
    // Somthing only happens when one of the number tiles are clicked
    if (tile.id > 0) {
      const result = emptySpaceIndex - clickedTileIndex;

      // A result of 3 or -3 means that the tile the user clicked is directly above or below the empty space
      if (result === 3 || result === -3) {
        this.swapArrayElements(emptySpaceIndex, clickedTileIndex);
      }
      // A result of -1 means that the tile the user clicked is directly
      // in front of the empty space and will be moved back one space
      else if (result === -1) {
        // Prevents clicked tiles at index 3 and 6 from teleporting
        // to the other side of the board ie. indexes 2 and 5 respectively.
        if (clickedTileIndex !== 3 && clickedTileIndex !== 6) {
          this.swapArrayElements(emptySpaceIndex, clickedTileIndex);
        }
      }
      // A result of 1 means that the tile the user clicked is directly
      // behind the empty space and will be moved forward one space
      else if (result === 1) {
        // Prevents clicked tiles at index 2 and 5 from teleporting
        // to the other side of the board ie. indexes 3 and 6 respectively.
        if (clickedTileIndex !== 2 && clickedTileIndex !== 5) {
          this.swapArrayElements(emptySpaceIndex, clickedTileIndex);
        }
      }
    }
  };

  swapArrayElements = (emptySpaceIndex, clickedTileIndex) => {
    // Creates a new array based on current positions of tiles
    const newTiles = this.state.tilesOnBoard.slice();

    // Swaps the indexes of the array elements
    const temp = newTiles[emptySpaceIndex];
    newTiles[emptySpaceIndex] = newTiles[clickedTileIndex];
    newTiles[clickedTileIndex] = temp;
    // Sets new array as the tilesOnBoard
    this.setState({ tilesOnBoard: newTiles }, () => {
      this.winChecker();
    });
  };

  winChecker = () => {
    // Returns true or false
    const check =
      JSON.stringify(this.state.tilesOnBoard) ===
      JSON.stringify(this.state.winningPattern);
    if (check === true) {
      this.setState({ didUserWin: true });
      console.log(`Congrats you win!!!!`);
    }
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

  toggle = () => {
    this.setState({ didUserWin: false });
  };

  handleInputChange = event => {
    let value = event.target.value;
    const name = event.target.name;

    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log(`Hello ${this.state.name}`);
    this.setState(
      {
        name: ""
      },
      () => this.toggle()
    );
  };

  resetBoard = () => {
    this.setState({
      tilesOnBoard: tilesArray.sort(function(a, b) {
        return 0.5 - Math.random();
      })
    });
  };

  render() {
    return (
      <Wrapper>
        <ModalRS 
          didUserWin={this.state.didUserWin}
          toggle={this.toggle}
          name={this.state.name}
          handleInputChange={this.handleInputChange}
          handleFormSubmit={this.handleFormSubmit}
        />
        <Navbar />
        <Gameboard resetBoard={this.resetBoard}>
          {this.state.tilesOnBoard.map(tile => (
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
