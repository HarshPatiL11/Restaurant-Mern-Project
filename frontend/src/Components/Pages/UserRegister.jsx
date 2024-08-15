import React, { useState } from "react";
import Layout from "../Layouts/Layout";
import axios from "axios";
import "../Css/register.css";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserRegister = () => {
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
    userAddress: "",
    userPhone: "",
    answer: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(null);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/register",
        formData
      );
      toast.success("Registration successful!");
      setSuccess("Registration successful!");
      console.log("Registration successful:", response.data);

      setFormData({
        userName: "",
        userEmail: "",
        userPassword: "",
        userAddress: "",
        userPhone: "",
        answer: "",
      });
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error.response.data);
      setError(error.response.data);
      toast.error("Registration failed! Please try again."); 
    }
  };

  return (
    <Layout>
      <div className="registerbody">
        <div className="register-container">
          <div className="register-glass-card">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="UserName"
                  id="userName"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="email"
                  placeholder="Email id"
                  id="userEmail"
                  name="userEmail"
                  value={formData.userEmail}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="password"
                  placeholder="Password"
                  id="userPassword"
                  name="userPassword"
                  value={formData.userPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  placeholder="Address"
                  type="text"
                  id="userAddress"
                  name="userAddress"
                  value={formData.userAddress}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  placeholder="Phone number"
                  type="text"
                  id="userPhone"
                  name="userPhone"
                  value={formData.userPhone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  placeholder="Reset Password Key"
                  type="text"
                  id="answer"
                  name="answer"
                  value={formData.answer}
                  onChange={handleChange}
                  required
                />
              </div>
              {success && <p className="success-message">{success}</p>}
              {error && <p className="error-message">{error}</p>}
              <button type="submit" className="register-btn">
                Register
              </button>
            </form>
            <p className="signup-link">
              Already have an account? <Link to={"/login"}>Login</Link>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
};

export default UserRegister;
