import React from "react";
import "./Gameboard.css";

const style = {
  width: "200"
};

const GameBoard = props => (
  <div className="container my-5">
    <div className="row justify-content-center">
      <div className="col">
        <div className="row justify-content-center">
          <div className="mb-3" id="tracker">
            <button className="btn" id="tracker-ldr">
              View Leaderboard
            </button>
            <button className="btn" id="tracker-btn">
              Time: 0:00 | Moves: 0
            </button>
          </div>
        </div>
        <div className="row justify-content-center">
          <div id="board">{props.children}</div>
        </div>
        <div className="row justify-content-center">
          <div className="mt-3" id="tracker">
            <button
              className="btn mr-2"
              id="tracker-reset"
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
