import React from "react";
import Layout from "../Layouts/Layout";
import { Box, Typography, Button } from "@mui/material";
import '../Css/Home.css'
import CategoryCard from "./CategoryCard";
import RestCards from "./RestrauntAll";

const Home = () => {
  return (
    <Layout>
      <div className="HomeContainer">
        <Box
          className="HomeDiv"
          
        >
          <Typography
            variant="h2"
            sx={{
              fontFamily: "Merriweather, serif",
              fontSize: "5.5rem",
            }}
          >
            Resto
          </Typography>
          <Typography 
            variant="h6"
            sx={{
              fontFamily: "Poppins, sans-serif",
              color: "#F5F5DC",
              fontSize: "1.8rem",
              marginY: "16px",
            }}
          >
            Best Restaurants at your fingertips
          </Typography>
          <Button
            variant="contained"
          >
            Check Now
          </Button>
        </Box>
      </div>
      <RestCards/>
      <CategoryCard />
    </Layout>
  );
};

export default Home;
