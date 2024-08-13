import React, { useState } from "react";
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
import { Link } from "react-router-dom";
import "../Css/Navbar.css";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  // mobile nav
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
        padding={" 18px 4px 7px 2px"}
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
          <Link to={"/menu"}>Menu</Link>
        </li>
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
            onClick={toggleNav} // Moved click handler here
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
                <Link to={"/menu"}>Menu</Link>
              </li>
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
