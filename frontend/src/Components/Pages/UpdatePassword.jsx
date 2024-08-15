import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../Layouts/Layout";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../Redux/AuthSlice";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!oldPassword || !newPassword) {
      setError("Please enter all fields.");
      return;
    }

    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.put(
        "http://localhost:8000/api/v1/user/updatePassword",
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message); // Show success toast
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        toast.error(err.response.data.message); // Show error toast
      } else {
        toast.error("An error occurred while updating the password.");
      }
    }
  };

  return (
    <Layout>
      <div className="updatePasswordContainer">
        <form className="contForm" onSubmit={handleSubmit}>
          <h2 className="contHeaderH6">Update Password</h2>
          <div className="input-group">
            <label htmlFor="oldPassword">Old Password</label>
            <input
              type="password"
              name="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              id="oldPassword"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              id="newPassword"
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="send-btn">
            Update Password
          </button>
        </form>
      </div>
      <ToastContainer />
    </Layout>
  );
};

export default UpdatePassword;
