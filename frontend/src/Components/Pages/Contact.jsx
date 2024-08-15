import React, { useState } from "react";
import Layout from "../Layouts/Layout";
import "../Css/Contact.css"; // Import your CSS file

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError("All fields are required");
      setSuccess("");
    } else {
      setError("");
      setSuccess("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" }); // Reset form
    }
  };

  return (
    <Layout>
      <div className="contContainer">
        <div className="cont-glass-card">
          <div className="contHeader">
            <h6 >Contact Us</h6>
          </div>
          {error && <div className="contError">{error}</div>}
          {success && <div className="contSuccess">{success}</div>}
          <form className="contForm" onSubmit={handleSubmit}>
            <div className="input-group">
            
              <input
              placeholder="Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                id="name"
                required
              />
            </div>
            <div className="input-group">
              <input
              placeholder="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                id="email"
                required
              />
            </div>
            <div className="input-group">
              <textarea
              placeholder="Query"
                name="message"
                value={formData.message}
                onChange={handleChange}
                id="message"
                required
              />
            </div>
            <button type="submit" className="send-btn">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
