import React from "react";
import "./Gameboard.css";

const GameBoard = props => (
  <div className="container my-5">
    <div className="row justify-content-center">
      <div className="col">
        <div className="row justify-content-center">
          <div id="board">{props.children}</div>
        </div>
        <div className="row justify-content-center">
          <div className="mt-3" id="reset-btn-div">
            <button
              className="btn mr-2"
              id="reset-btn"
              onClick={props.resetBoard}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default GameBoard;
