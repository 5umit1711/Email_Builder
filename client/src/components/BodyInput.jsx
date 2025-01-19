import React, { useState } from "react";

const BodyInput = ({ tab, setTab, emailTemplate, setEmailTemplate }) => {
  const [body, setBody] = useState({
    text: "",
    font_size: "20px",
    color: "#000000",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBody((prevBody) => ({
      ...prevBody,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setEmailTemplate((prevTemplate) => ({
      ...prevTemplate,
      body: body,
    }));
  };

  const handleNext = () => {
    setTab(tab + 1);
  };

  const handleBack = () => {
    setTab(tab - 1);
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Customize Body
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Body Text:
        </label>
        <input
          type="text"
          name="text"
          value={body.text}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Enter your body"
          style={{
            fontSize: body.font_size,
            color: body.color,
          }}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Font Size:
        </label>
        <select
          name="font_size"
          value={body.font_size}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="12px">Small (12px)</option>
          <option value="16px">Medium (16px)</option>
          <option value="20px">Large (20px)</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Font Color:
        </label>
        <input
          type="color"
          name="color"
          value={body.color}
          onChange={handleChange}
          className="w-10 h-10 border rounded-full"
        />
      </div>

      <div className="flex justify-between">
        <button
          onClick={handleBack}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transition duration-300"
        >
          Back
        </button>
        <div className="flex space-x-4">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600 transition duration-300"
          >
            Save
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BodyInput;
