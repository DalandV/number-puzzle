import React from 'react';
// import './Tile.css'

const Tile = (props) => (
  <div className={props.class(props.tileObject)} onClick={() => props.tileClick(props.tileObject, props.emptySpaceObject)}>
    {props.children}
  </div>
);

export default Tile;