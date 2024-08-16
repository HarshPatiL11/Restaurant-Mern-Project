import React, { useState } from "react";
import "../Css/UserLogin.css";
import axios from "axios";
import Layout from "../Layouts/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../Redux/AuthSlice";
const LoginForm = () => {
  const [formData, setFormData] = useState({
    userEmail: "",
    userPassword: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const dispatch = useDispatch();
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
    setError(null);
    setSuccess(null);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/login",
        formData
      );
      console.log(response.data);
      const { token } = response.data; 
      localStorage.setItem("userToken", token);
      console.log("Token:", token); 
      setSuccess("Login successful!");
      dispatch(login());
      navigate("/");
    } catch (error) {
      setError("Login failed! Please check your credentials.");
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="loginbody">
        <div className="login-container">
          <div className="login-glass-card">
            <h2>Login</h2>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <input
                  placeholder="Email Id"
                  type="email"
                  id="email"
                  name="userEmail"
                  value={formData.userEmail}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  placeholder="Password"
                  type="password"
                  id="password"
                  name="userPassword"
                  value={formData.userPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="login-btn">
                Login
              </button>
            </form>
          </div>
          <p className="signup-link">
            {/* Forgot your Password? <Link to={"/forget"}>ForgotPassowrd</Link><br/>  */}
            Don't have an account? <Link to={"/register"}>Sign up</Link>
            <br />
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default LoginForm;
