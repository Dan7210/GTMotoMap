import React from "react";
import "./Legend.css";

const Legend = () => {
  const items = [
    { color: "green", text: "Official PTS Parking Spot / Easy to access" },
    { color: "yellow", text: "Restricted PTS Parking Spot / Still possible to access" },
    { color: "red", text: "Deprecated PTS Parking Spot / Hard to access" },
    { color: "blue", text: "Unofficial Spot / Park at your own risk" },
  ];

  return (
    <div className="legend">
      {items.map((item, index) => (
        <div key={index} className="legend-item">
          <span className="legend-color" style={{ backgroundColor: item.color }}></span>
          <span className="legend-text">{item.text}</span>
        </div>
      ))}
    </div>
  );
};

export default Legend;
