import React, { useState, useEffect, useCallback } from "react";

const ProgressBar = ({ initialState, onStateChange }) => {
  const [goal, setGoal] = useState(initialState.goal);
  const [progress, setProgress] = useState(initialState.progress);

  const updateState = useCallback(() => {
    onStateChange({ goal, progress });
  }, [goal, progress, onStateChange]);

  useEffect(() => {
    updateState();
  }, [updateState]);

  const incrementProgress = () => {
    setProgress((prevProgress) => {
      const newProgress = prevProgress < goal ? prevProgress + 1 : prevProgress;
      return newProgress;
    });
  };

  const handleGoalChange = (e) => {
    const newGoal = parseInt(e.target.value) || 0;
    setGoal(newGoal);
    // Ensure progress doesn't exceed the new goal
    setProgress((prevProgress) => Math.min(prevProgress, newGoal));
  };

  return (
    <div className="progress-bar">
      <input
        type="number"
        value={goal}
        onChange={handleGoalChange}
        placeholder="Goal"
      />
      <div className="progress" style={{ width: `${goal > 0 ? (progress / goal) * 100 : 0}%` }}></div>
      <button onClick={incrementProgress}>Increment</button>
      <div>{progress}/{goal}</div>
    </div>
  );
};

export default ProgressBar;