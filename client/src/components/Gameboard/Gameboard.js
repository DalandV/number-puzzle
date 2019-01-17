import React from "react";
import "./Gameboard.css"

const GameBoard = (props) => (
  <div className="container ">
    <div className="row justify-content-center">
      <div className="col">
        <div className="row justify-content-center">
          <div id="board">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default GameBoard;