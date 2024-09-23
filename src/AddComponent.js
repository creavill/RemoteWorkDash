import React, { useState } from "react";

const AddComponent = ({ addComponent }) => {
  const [component, setComponent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addComponent(component);
    setComponent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={component}
        onChange={(e) => setComponent(e.target.value)}
        placeholder="Enter component"
      />
      <button type="submit">Add Component</button>
    </form>
  );
};

export default AddComponent;