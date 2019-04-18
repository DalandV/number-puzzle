import React from "react";
import './Tile.css'

const Tile = props => (
  <div
    className={props.class}
    onClick={() => props.handleTileClick(props.tileObject)}
  >
    {props.children}
  </div>
);

// ORIGINAL CODE ==================================
// const Tile = props => (
//   <div
//     className={props.class(props.tileObject)}
//     onClick={() => props.tileClick(props.tileObject)}
//   >
//     {props.children}
//   </div>
// );

export default Tile;
