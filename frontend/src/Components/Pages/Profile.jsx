import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../Redux/AuthSlice";
import { useNavigate } from "react-router-dom";
import "../Css/UserProfile.css"; 
import Layout from "../Layouts/Layout";
import AdminPanel from "./AdminPanel.jsx"; 
import VendorPanel from "./VendorPanel.jsx"; 
import ClientPanel from "./ClientPanel.jsx"; 

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const response = await axios.get(
          "http://localhost:8000/api/v1/user/User",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch user data. Please log in again.");
        dispatch(logout());
        navigate("/login");
      }
    };

    fetchUserData();
  }, [dispatch, navigate]);

  const handleUpdate = () => {
    navigate("/user/update");
  };

  const handleChangePassword = () => {
    navigate("/user/changepassword");
  };

  // Conditional rendering based on userType
  const renderUserPanel = () => {
    if (!user) return null;

    switch (user.userType) {
      case "admin":
        return <AdminPanel />;
      case "vendor":
        return <VendorPanel />;
      case "client":
        return <ClientPanel />;
      default:
        return <p>Access Denied</p>;
    }
  };

  return (
    <Layout>
      {!isLoggedIn ? (
        <>{navigate("/login")}</>
      ) : (
        <>
          <div className="RestIdSection">
            {error && <div className="error-message">{error}</div>}
            {user ? (
              <div className="restaurantDetailContainer">
                <h2>User Profile</h2>
                <img
                  src={user.profile}
                  alt="Profile"
                  className="profile-image"
                />
                <table className="userDetailsTable">
                  <tbody>
                    <tr>
                      <th>Name</th>
                      <td>{user.userName}</td>
                    </tr>
                    <tr>
                      <th>Email</th>
                      <td>{user.userEmail}</td>
                    </tr>
                    <tr>
                      <th>Phone</th>
                      <td>{user.userPhone}</td>
                    </tr>
                    <tr>
                      <th>Address</th>
                      <td>{user.userAddress.join(", ")}</td>
                    </tr>
                    <tr>
                      <th>User Type</th>
                      <td>{user.userType}</td>
                    </tr>
                    <tr>
                      <th>Profile Created At</th>
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    </tr>
                    <tr>
                      <th>Last Updated At</th>
                      <td>{new Date(user.updatedAt).toLocaleDateString()}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="buttons">
                  <button className="update-btn" onClick={handleUpdate}>
                    Update
                  </button>
                  <button
                    className="reset-password-btn"
                    onClick={handleChangePassword}
                  >
                    Change Password
                  </button>
                </div>
                {/* Render user-specific panel */}
                {renderUserPanel()}
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </>
      )}
    </Layout>
  );
};

export default UserProfile;
