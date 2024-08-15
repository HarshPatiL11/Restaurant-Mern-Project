import React from "react";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { IoRestaurantOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../Redux/AuthSlice";
import axios from "axios";
import "../Css/Navbar.css";

const Navbar = () => {
  const [navOpen, setNavOpen] = React.useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  const handleLogin = () => {
    dispatch(login()); // Dispatch login action
  };

  const handleLogout = async () => {
    try {
      // Optional API call to log out on the server
      await axios.post(
        "http://localhost:8000/api/v1/user/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      console.log("User logged out successfully."); // You can handle this response as needed
    } catch (err) {
      console.error(err);
    }

    dispatch(logout());
    navigate("/login");
  };

  const navigateToProfile = () => {
    const userType = localStorage.getItem("userType");
    if (userType === "admin") {
      navigate("/profile/admin");
    } else if (userType === "restaurantOwner") {
      navigate("/profile/owner");
    } else if (userType === "customer") {
      navigate("/profile/customer");
    } else {
      navigate("/user"); // Default profile page
    }
  };

  const drawer = (
    <Box
      onClick={toggleNav}
      sx={{
        textAlign: "center",
        bgcolor: "#004225",
        height: "100%",
        width: "250px",
      }}
    >
      <Typography
        padding={"18px 4px 7px 2px"}
        color={"#F5F5DC"}
        fontSize={"26px"}
        variant="h5"
        component={"div"}
        sx={{
          display: { xs: "flex", sm: "none" },
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Merriweather, serif",
        }}
      >
        <IoRestaurantOutline
          className="Resto-icon"
          style={{ marginRight: "8px" }}
        />
        Resto
      </Typography>
      <ul className="nav-menu-mobile">
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/about"}>About</Link>
        </li>
        <li>
          <Link to={"/contact"}>Contact</Link>
        </li>
        <li>
          <Link
            to={isLoggedIn ? "#" : "/login"}
            onClick={isLoggedIn ? navigateToProfile : null}
          >
            <FaUser style={{ marginRight: "5px" }} />
            {isLoggedIn ? "Profile" : "Login"}
          </Link>
        </li>
        {isLoggedIn && (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        )}
      </ul>
    </Box>
  );

  return (
    <Box>
      <AppBar component={"nav"} sx={{ bgcolor: "#004225" }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={toggleNav}
            sx={{ color: "#F5F5DC", display: { sm: "none" } }}
            aria-label="open Drawer"
            edge="start"
          >
            <MenuOutlinedIcon sx={{ mr: "8px", fontSize: 35 }} />
            <Typography
              color={"#F5F5DC"}
              fontSize={"26px"}
              variant="h5"
              component={"div"}
              sx={{
                display: "flex",
                alignItems: "center",
                fontFamily: "Merriweather, serif",
              }}
            >
              Resto
            </Typography>
          </IconButton>
          <Typography
            color={"#F5F5DC"}
            fontSize={"26px"}
            variant="h5"
            component={"div"}
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              fontFamily: "Merriweather, serif",
            }}
          >
            <IoRestaurantOutline
              className="Resto-icon"
              style={{ marginRight: "8px" }}
            />
            Resto
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <ul className="nav-menu">
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/about"}>About</Link>
              </li>
              <li>
                <Link to={"/contact"}>Contact</Link>
              </li>
              <li>
                <Link
                  to={isLoggedIn ? "#" : "/login"}
                  onClick={isLoggedIn ? navigateToProfile : null}
                >
                  <FaUser style={{ marginRight: "5px" }} />
                  {isLoggedIn ? "Profile" : "Login"}
                </Link>
              </li>
              {isLoggedIn && (
                <li>
                  <Link onClick={handleLogout}>Logout</Link>
                </li>
              )}
            </ul>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component={"nav"}>
        <Drawer
          variant="temporary"
          open={navOpen}
          onClose={toggleNav}
          sx={{ display: { xs: "block", sm: "none" } }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box sx={{}}>
        <Toolbar />
      </Box>
    </Box>
  );
};

export default Navbar;
