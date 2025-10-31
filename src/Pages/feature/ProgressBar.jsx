import React from 'react'
import "./ProgressBar.css"

const ProgressBar = ({ value = 0, max = 100, color = "#facc15" }) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="progress-bar">
      <div
        className="progress-fill"
        style={{
          width: `${percentage}%`,
          background: color,
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;
