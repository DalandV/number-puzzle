import React from "react";
import "./Gameboard.css";

const GameBoard = props => (
  <div className="container d-flex justify-content-center align-items-center">
    <div className="row">
      <div className="col">
        <div className="row">
          <div id="board">{props.children}</div>
        </div>
        <div className="row">
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
