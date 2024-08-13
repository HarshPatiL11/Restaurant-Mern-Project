import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "#004225", // Background color
        color: "#F5F5DC", // Text color
        textAlign: "center",
        padding: "16px",
        position: "relative",
        bottom: 0,
        width: "100%",
      }}
    >
      <Typography variant="h6" sx={{ fontFamily: "Poppins, sans-serif" }}>
        Made by HarshPatiL11
      </Typography>
      <Typography variant="body2" sx={{ fontFamily: "Poppins, sans-serif" }}>
        &copy; {new Date().getFullYear()} All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
