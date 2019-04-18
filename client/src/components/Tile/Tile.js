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

export default Tile;
