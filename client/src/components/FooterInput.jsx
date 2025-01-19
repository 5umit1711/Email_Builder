import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const FooterInput = ({ emailTemplate, setEmailTemplate, setEnableUpload, setTab, tab }) => {
  const navigate = useNavigate();
  const [footer, setFooter] = useState({
    text: "",
    font_size: "20px",
    color: "#000000",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFooter((prevFooter) => {
      const updatedFooter = { ...prevFooter, [name]: value };
      setEmailTemplate((prev) => ({
        ...prev,
        footer: updatedFooter,
      }));
      return updatedFooter;
    });
  };

  const handleBackgroundChange = (e) => {
    const value = e.target.value;
    setEmailTemplate((prevTemplate) => ({
      ...prevTemplate,
      background: value,
    }));
  };

  const handleSave = async () => {
    try {
      setEmailTemplate((prevTemplate) => ({
        ...prevTemplate,
        footer: footer,
      }));

      const { data } = await axios.post(
        "/api/post",
        emailTemplate
      );
      if (data.success) {
        localStorage.setItem("emailId", data.email._id);
        toast.success(data.message);
        setEnableUpload(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error in frontend:", error);
    }
  };

  const handleBack = () => {
    setTab(tab - 1); 
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Customize Footer
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Footer Text:
        </label>
        <input
          type="text"
          name="text"
          value={footer.text}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Enter your footer"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Font Size:
        </label>
        <select
          name="font_size"
          value={footer.font_size}
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
          value={footer.color}
          onChange={handleChange}
          className="w-10 h-10 border rounded-full"
        />
      </div>

      {/* Background and Theme */}
      <div className="flex justify-between items-center mb-4">
        {/* Background Color */}
        <div className="w-1/2 pr-2">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Background Color:
          </label>
          <input
            type="color"
            value={emailTemplate.background}
            onChange={handleBackgroundChange}
            className="w-8 h-8 border rounded-full"
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={handleBack}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transition duration-300"
        >
          Back
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600 transition duration-300"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default FooterInput;
