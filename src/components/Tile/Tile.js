import React from 'react';
import './Tile.css'

const Tile = (props) => {

  const classes = [];
  if (props.id === 0) {
    classes.push("empty-tile")
  }
  else {
    classes.push("tile")
  }

  return (
    <div className={classes} onClick={() => props.tileClick(props.tileData)}>
      {props.id === 0 ?
        null : <span>{props.value}</span>
      }
    </div>
  )
};

export default Tile;