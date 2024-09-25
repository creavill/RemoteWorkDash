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
  const [titles, setTitles] = useState(Array(16).fill("Title"));
  const [savedComponents, setSavedComponents] = useState([]);

  const addComponent = (index, component, title) => {
    const newComponents = [...components];
    newComponents[index] = component;
    setComponents(newComponents);

    const newTitles = [...titles];
    newTitles[index] = title;
    setTitles(newTitles);
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

  const handleTitleChange = (index, event) => {
    const newTitles = [...titles];
    newTitles[index] = event.target.value;
    setTitles(newTitles);
  };

  const saveComponent = (index) => {
    const componentToSave = components[index];
    const titleToSave = titles[index];
    let stateToSave = null;

    if (componentToSave && (componentToSave.type === ProgressBar || componentToSave.type === ToDoList)) {
      stateToSave = componentToSave.props.initialState;
    }

    setSavedComponents((prevSavedComponents) => [
      ...prevSavedComponents,
      { component: componentToSave, title: titleToSave, state: stateToSave },
    ]);

    setComponents((prevComponents) => {
      const newComponents = [...prevComponents];
      newComponents[index] = null;
      return newComponents;
    });

    setTitles((prevTitles) => {
      const newTitles = [...prevTitles];
      newTitles[index] = "Title";
      return newTitles;
    });
  };

  const restoreComponent = (savedIndex) => {
    const { component, title, state } = savedComponents[savedIndex];

    const emptyIndex = components.findIndex(comp => comp === null);
    if (emptyIndex === -1) {
      alert("No empty slots available to restore the component.");
      return;
    }

    setComponents((prevComponents) => {
      const newComponents = [...prevComponents];
      if (component && (component.type === ProgressBar || component.type === ToDoList)) {
        newComponents[emptyIndex] = React.cloneElement(component, {
          initialState: state,
          onStateChange: (newState) => {
            setComponents(prevComponents => {
              const updatedComponents = [...prevComponents];
              updatedComponents[emptyIndex] = React.cloneElement(
                updatedComponents[emptyIndex],
                { initialState: newState }
              );
              return updatedComponents;
            });
          }
        });
      } else {
        newComponents[emptyIndex] = component;
      }
      return newComponents;
    });

    setTitles((prevTitles) => {
      const newTitles = [...prevTitles];
      newTitles[emptyIndex] = title;
      return newTitles;
    });

    setSavedComponents((prevSavedComponents) => {
      const newSavedComponents = [...prevSavedComponents];
      newSavedComponents.splice(savedIndex, 1);
      return newSavedComponents;
    });
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
              <div className="title">{titles[index]}</div>
              {component ? (
                component
              ) : (
                <div className="plus">+</div>
              )}
              {dropdowns[index] && (
                <div className="dropdown">
                  <div className="dropdown-content">
                    <input
                      type="text"
                      value={titles[index]}
                      onChange={(event) => handleTitleChange(index, event)}
                      placeholder="Enter a title"
                    />
                    <a onClick={() => addComponent(index, "Calendar", "Calendar")}>
                      Calendar
                    </a>
                    <a onClick={() => addComponent(index, "Tasks", "Tasks")}>
                      Tasks
                    </a>
                    <a onClick={() => addComponent(index, "Messages", "Messages")}>
                      Messages
                    </a>
                    <a onClick={() => addComponent(index, "Files", "Files")}>
                      Files
                    </a>
                    <a onClick={() => addComponent(index, "Notes", "Notes")}>
                      Notes
                    </a>
                    <a onClick={() => addComponent(index, 
                      <ProgressBar 
                        initialState={{goal: 0, progress: 0}} 
                        onStateChange={(newState) => {
                          setComponents(prevComponents => {
                            const updatedComponents = [...prevComponents];
                            updatedComponents[index] = React.cloneElement(
                              updatedComponents[index],
                              { initialState: newState }
                            );
                            return updatedComponents;
                          });
                        }} 
                      />, 
                      "Progress Bar")}>
                      Progress Bar
                    </a>
                    <a onClick={() => addComponent(index, 
                      <ToDoList 
                        initialState={{tasks: []}} 
                        onStateChange={(newState) => {
                          setComponents(prevComponents => {
                            const updatedComponents = [...prevComponents];
                            updatedComponents[index] = React.cloneElement(
                              updatedComponents[index],
                              { initialState: newState }
                            );
                            return updatedComponents;
                          });
                        }} 
                      />, 
                      "To Do List")}>
                      To Do List
                    </a>
                    <a onClick={() => saveComponent(index)}>Save and Delete</a>
                  </div>
                </div>
              )}
            </div>
          </ResizableBox>
        ))}
      </div>
      <div className="saved-components">
        <h2>Saved Components</h2>
        {savedComponents.map((savedComponent, index) => (
          <div key={index} className="saved-component">
            <span>{savedComponent.title}</span>
            <a onClick={() => restoreComponent(index)}>Restore</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;