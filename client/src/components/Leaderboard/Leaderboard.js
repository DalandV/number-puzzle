import React from "react";
import "./Leaderboard.css";

const style = {
  width: "18rem"
};

const Leaderboard = () => (
  <div className="card" style={style}>
    <div className="card-header">Featured</div>
    <ul className="list-group list-group-flush">
      <li className="list-group-item">Cras justo odio</li>
      <li className="list-group-item">Dapibus ac facilisis in</li>
      <li className="list-group-item">Vestibulum at eros</li>
    </ul>
  </div>
);

export default Leaderboard;
