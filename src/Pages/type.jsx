import React, { useState } from "react";

function CreateCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [featureNames, setFeatureNames] = useState([""]);

  const handleFeatureNameChange = (index, value) => {
    const updatedFeatureNames = [...featureNames];
    updatedFeatureNames[index] = value;
    setFeatureNames(updatedFeatureNames);
  };

  const addFeatureInput = () => {
    setFeatureNames([...featureNames, ""]);
  };

  const removeFeatureInput = (index) => {
    const updatedFeatureNames = [...featureNames];
    updatedFeatureNames.splice(index, 1);
    setFeatureNames(updatedFeatureNames);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const categoryData = {
      categoryName,
      featureNames,
    };

    try {
      const response = await fetch("http://localhost:8089/categories/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      });

      if (response.status === 201) {
        // Handle successful creation
        // You can redirect to a success page or show a success message
      } else {
        // Handle errors here
        // You can display an error message to the user
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Create Category</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Category Name:</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Features:</label>
          {featureNames.map((featureName, index) => (
            <div key={index}>
              <input
                type="text"
                value={featureName}
                onChange={(e) => handleFeatureNameChange(index, e.target.value)}
                required
              />
              <button type="button" onClick={() => removeFeatureInput(index)}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addFeatureInput}>
            Add Feature
          </button>
        </div>
        <button type="submit">Create Category</button>
      </form>
    </div>
  );
}

export default CreateCategory;