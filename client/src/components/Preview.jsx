import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Preview = ({ emailTemplate, enableUpload }) => {
  const [logo, setLogo] = useState(null);
  const [image, setImage] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleFileChange = (e, setPreviewCallback, setFileCallback) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewCallback(reader.result);
      };
      reader.readAsDataURL(file);
      setFileCallback(file);
    }
  };

  const handleUpload = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      const emailId = localStorage.getItem("emailId");
      if (logoFile) formData.append("logo", logoFile);
      if (imageFile) formData.append("image", imageFile);
      const { data } = await axios.post(
        `/api/upload-image/${emailId}`,
        formData
      );
      if (data.success) {
        toast.success(data.message);
        navigate(`/email/${emailId}`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error in uploading frontend", error);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <div
      className="container"
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: emailTemplate.background || "white",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        position: "relative",
        color: "#000",
      }}
    >
      {/* Logo Section */}
      <div className="logo" style={{ marginBottom: "20px" }}>
        {!logo && (
          <>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "bold",
                color: emailTemplate.theme || "#000",
              }}
            >
              Logo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, setLogo, setLogoFile)}
              className="mb-2"
            />
          </>
        )}
        {logo && (
          <img
            src={logo}
            alt="Logo Preview"
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              display: "block",
              margin: "0 auto",
            }}
          />
        )}
      </div>

      {/* Title Section */}
      <div
        className="title"
        style={{
          fontSize: emailTemplate.title.font_size,
          color: emailTemplate.title.color,
          marginBottom: "20px",
        }}
      >
        {emailTemplate.title.text ? emailTemplate.title.text : "Title"}
      </div>

      {/* Body Section */}
      <div
        className="body"
        style={{
          fontSize: emailTemplate.body.font_size,
          color: emailTemplate.body.color,
          lineHeight: 1.6,
          marginBottom: "20px",
        }}
      >
        {emailTemplate.body.text ? emailTemplate.body.text : "Body"}
      </div>

      {/* Image Section */}
      <div
        className="image-section"
        style={{
          textAlign: "center",
          margin: "20px 0",
        }}
      >
        {!image && (
          <>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "bold",
                color: "#000",
              }}
            >
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, setImage, setImageFile)}
              className="mb-2"
            />
          </>
        )}
        {image && (
          <img
            src={image}
            alt="Image Preview"
            style={{
              width: "100%",
              maxWidth: "200px",
              height: "200px",
              borderRadius: "8px",
              display: "block",
              margin: "0 auto",
            }}
          />
        )}
      </div>

      {/* Footer Section */}
      <div
        className="footer"
        style={{
          fontSize: emailTemplate.footer.font_size,
          color: emailTemplate.footer.color,
          marginTop: "20px",
        }}
      >
        {emailTemplate.footer.text ? emailTemplate.footer.text : "Footer"}
      </div>

      {/* Loader */}
      {loading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            zIndex: 10,
          }}
        >
          <div className="loader" style={{ border: "4px solid #ccc", borderTop: "4px solid #4caf50", borderRadius: "50%", width: "40px", height: "40px", animation: "spin 1s linear infinite" }}></div>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!logo || !image || !enableUpload || loading}
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          backgroundColor: logo && image && enableUpload && !loading ? "#4caf50" : "#ccc",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "4px",
          cursor: logo && image && enableUpload && !loading ? "pointer" : "not-allowed",
          fontSize: "16px",
        }}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default Preview;
