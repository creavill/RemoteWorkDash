import React, { useState } from "react";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import AddComponent from "./AddComponent";
import ProgressBar from "./ProgressBar";
import ToDoList from "./ToDoList";

const Dashboard = () => {
  const [components, setComponents] = useState(Array(16).fill(null));
  const [widths, setWidths] = useState(Array(16).fill(250));
  const [heights, setHeights] = useState(Array(16).fill(125));
  const [dropdowns, setDropdowns] = useState(Array(16).fill(false));

  const addComponent = (index, component) => {
    const newComponents = [...components];
    newComponents[index] = component;
    setComponents(newComponents);
  };

  const toggleDropdown = (index) => {
    const newDropdowns = [...dropdowns];
    newDropdowns[index] = !newDropdowns[index];
    setDropdowns(newDropdowns);
  };

  const onResizeStop = (index, _, { size }) => {
    const newWidths = [...widths];
    const newHeights = [...heights];
    newWidths[index] = size.width;
    newHeights[index] = size.height;
    setWidths(newWidths);
    setHeights(newHeights);
  };

  return (
    <div className="dashboard">
      <h1>Remote Workers Dashboard</h1>
      <div className="flex-container">
        {components.map((component, index) => (
          <ResizableBox
            key={index}
            width={widths[index]}
            height={heights[index]}
            onResizeStop={(e, data) => onResizeStop(index, e, data)}
          >
            <div
              className={`flex-item ${component ? "filled" : ""}`}
              onClick={() => toggleDropdown(index)}
            >
              {component ? (
                component
              ) : (
                <div className="plus">+</div>
              )}
              {dropdowns[index] && (
                <div className="dropdown">
                  <div className="dropdown-content">
                    <a onClick={() => addComponent(index, "Calendar")}>Calendar</a>
                    <a onClick={() => addComponent(index, "Tasks")}>Tasks</a>
                    <a onClick={() => addComponent(index, "Messages")}>Messages</a>
                    <a onClick={() => addComponent(index, "Files")}>Files</a>
                    <a onClick={() => addComponent(index, "Notes")}>Notes</a>
                    <a onClick={() => addComponent(index, <ProgressBar />)}>Progress Bar</a>
                    <a onClick={() => addComponent(index, <ToDoList />)}>To Do List</a>
                  </div>
                </div>
              )}
            </div>
          </ResizableBox>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;