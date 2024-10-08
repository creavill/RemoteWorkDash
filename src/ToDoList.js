import React, { useState, useEffect, useCallback } from "react";

const ToDoList = ({ initialState, onStateChange }) => {
  const [tasks, setTasks] = useState(initialState.tasks || []);
  const [newTask, setNewTask] = useState("");

  const updateState = useCallback(() => {
    onStateChange({ tasks });
  }, [tasks, onStateChange]);

  useEffect(() => {
    updateState();
  }, [updateState]);

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setNewTask("");
    }
  };

  const removeTask = (index) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  return (
    <div className="todo-list">
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="New Task"
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={() => removeTask(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;