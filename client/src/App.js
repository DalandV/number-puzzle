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
    emptySpaceIndex: tiles.findIndex(x => x.id === 0),
    clickedTileIndex: null,
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

  winChecker = () => {
    const check =
      JSON.stringify(this.state.tiles) ===
      JSON.stringify(this.state.winningPattern);
    if (check === true) {
      this.setState({ didUserWin: true });
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

  resetBoard = event => {
    event.preventDefault();
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
        <Gameboard>
          {this.state.tiles.map(tile => (
            <Tile
              key={tile.id}
              tileObject={tile}
              class={this.handleStyleClasses(tile)}
              handleTileClick={this.handleTileClick}
              resetBoard={this.resetBoard}
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
