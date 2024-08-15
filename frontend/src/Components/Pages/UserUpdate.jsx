import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../Redux/AuthSlice";
import { toast, ToastContainer } from "react-toastify"; // Import Toast components
import "react-toastify/dist/ReactToastify.css"; // Import default styles
import "../Css/UpdateUser.css"; // Import CSS for styling
import Layout from "../Layouts/Layout";

const UpdateUser = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const response = await axios.get(
          "http://localhost:8000/api/v1/user/User", // Fetch user data endpoint
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        toast.error("Failed to fetch user data. Please log in again."); // Toast for error
        dispatch(logout());
        navigate("/login");
      }
    };

    fetchUserData();
  }, [dispatch, navigate]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("userToken");
    await axios.put(
      "http://localhost:8000/api/v1/user/updateUser",
      {
        ...user,
        userAddress: Array.isArray(user.userAddress)
          ? user.userAddress.join(", ") // If it's an array, join into a string
          : typeof user.userAddress === "string"
          ? user.userAddress.split(", ") // If it's a string, split it into an array
          : [], // Fallback to an empty array if it's neither
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("User updated successfully!");
    navigate('/user')
  } catch (err) {
    console.error("Error updating user data:", err);
    toast.error("Failed to update user data.");
  }
};

  return (
    <Layout>
      <div className="updateUserContainer">
        {user ? (
          <form className="updateUserForm" onSubmit={handleSubmit}>
            <h2 >Update User Profile</h2>
            <div className="input-group">
              <label htmlFor="userName">Name</label>
              <input
                type="text"
                name="userName"
                value={user.userName}
                onChange={handleChange}
                id="userName"
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="userPhone">Phone</label>
              <input
                type="text"
                name="userPhone"
                value={user.userPhone}
                onChange={handleChange}
                id="userPhone"
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="userAddress">Address</label>
              <input
                type="text"
                name="userAddress"
                value={user.userAddress.join(", ")} // Join array for display
                onChange={handleChange}
                id="userAddress"
                required
              />
            </div>
            <button type="submit" className="send-btn">
              Update
            </button>
          </form>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
      <ToastContainer /> {/* Add ToastContainer for toasts */}
    </Layout>
  );
};

export default UpdateUser;
