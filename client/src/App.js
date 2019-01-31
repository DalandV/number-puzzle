import React, { Component } from "react";
import "./App.css";
import {
  Button,
  Form,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import Wrapper from "./components/Wrapper";
// import ModalBS from "./components/Modal";
import Navbar from "./components/Navbar";
// import Leaderboard from "./components/Leaderboard";
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
    didUserWin: false,
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
    name: ""
  };

  // TEMPORARY
  // .sort(function(a, b) {
  //   return 0.5 - Math.random();
  // })

  handleTileClick = tile => {
    const emptySpaceIndex = this.state.tiles.findIndex(x => x.id === 0);
    const clickedTileIndex = this.state.tiles.findIndex(x => x.id === tile.id);
    // Somthing only happens when one of the number tiles are clicked
    if (tile.id > 0) {
      this.setState(
        {
          // Sets the 'clickedTileIndex' to the index of the clicked tile by comparing
          // the id of each object in the 'tiles' array to the id of the tile passed in
          // through the 'tileObject' prop
          clickedTileIndex: tiles.findIndex(x => x.id === tile.id)
        },
        () => {
          console.log(this.state.tiles);
          console.log(
            `Empty Space Index Before Swap: ${this.state.emptySpaceIndex}`
          );
          console.log(
            `Clicked Tile Index Before Swap: ${this.state.clickedTileIndex}`
          );
          // This section makes sure that the tiles cannot jump all over the board
          const { emptySpaceIndex, clickedTileIndex } = this.state;
          const result = emptySpaceIndex - clickedTileIndex;

          // A result of 3 or -3 means that the tile the user clicked is directly above or below the empty space
          if (result === 3 || result === -3) {
            this.swapArrayElements();
          }
          // A result of -1 means that the tile the user clicked is directly in front of the empty space
          else if (result === -1) {
            // Prevents clicked tiles at index 3 and 6 from teleporting
            // to the other side of the board ie. indexes 2 and 5 respectively.
            if (clickedTileIndex !== 3 && clickedTileIndex !== 6) {
              this.swapArrayElements();
            }
          }
          // A result of 1 means that the tile the user clicked is directly behind the empty space
          else if (result === 1) {
            // Prevents clicked tiles at index 2 and 5 from teleporting
            // to the other side of the board ie. indexes 3 and 6 respectively.
            if (clickedTileIndex !== 2 && clickedTileIndex !== 5) {
              this.swapArrayElements();
            }
          }
        }
      );
    }
  };

  swapArrayElements = () => {
    // This function swaps the array elements
    // Im not sure how to explain it well but it works
    const { emptySpaceIndex, clickedTileIndex } = this.state;

    const newTiles = this.state.tiles.slice();

    const temp = newTiles[emptySpaceIndex];
    newTiles[emptySpaceIndex] = newTiles[clickedTileIndex];
    newTiles[clickedTileIndex] = temp;

    this.setState(
      { tiles: newTiles, emptySpaceIndex: clickedTileIndex },
      () => {
        console.log(this.state.tiles);
        console.log(
          `Empty Space Index After Swap: ${this.state.emptySpaceIndex}`
        );
        console.log(
          `Clicked Tile Index After Swap: ${this.state.clickedTileIndex}`
        );
        this.winChecker();
      }
    );
  };

  winChecker = () => {
    // Returns true or false
    const check =
      JSON.stringify(this.state.tiles) ===
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
      tiles: tiles.sort(function(a, b) {
        return 0.5 - Math.random();
      })
    });
  };

  render() {
    return (
      <Wrapper>
        <Modal
          isOpen={this.state.didUserWin}
          toggle={this.toggle}
          centered={true}
        >
          <ModalHeader toggle={this.toggle}>You Won!!</ModalHeader>
          <ModalBody>
            Congratulations on completing the puzzle! Add your name below so
            that you can be added to our leaderboard.
            <Form className="mt-2">
              <Input
                value={this.state.name}
                name="name"
                type="text"
                placeholder="Enter your name here"
                onChange={this.handleInputChange}
              />
              <ModalFooter>
                <Button color="primary" onClick={this.handleFormSubmit}>
                  Add Me!
                </Button>{" "}
                <Button color="secondary" onClick={this.toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Form>
          </ModalBody>
        </Modal>
        <Navbar />
        <Gameboard resetBoard={this.resetBoard}>
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
