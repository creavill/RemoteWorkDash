import React, { useState } from "react";

const ProgressBar = () => {
  const [goal, setGoal] = useState(0);
  const [progress, setProgress] = useState(0);

  const incrementProgress = () => {
    setProgress((prevProgress) => (prevProgress < goal ? prevProgress + 1 : prevProgress));
  };

  return (
    <div className="progress-bar">
      <input
        type="number"
        value={goal}
        onChange={(e) => setGoal(parseInt(e.target.value))}
        placeholder="Goal"
      />
      <div className="progress" style={{ width: `${progress}%` }}></div>
      <button onClick={incrementProgress}>Increment</button>
      <div>{progress}/{goal}</div>
    </div>
  );
};

export default ProgressBar;