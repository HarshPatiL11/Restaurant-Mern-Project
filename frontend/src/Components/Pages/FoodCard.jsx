// FoodCard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Css/FoodCard.css";
import Layout from "../Layouts/Layout";

const FoodCard = () => {
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/food/getAll"
        );
        setFoods(response.data.foods);
      } catch (error) {
        console.error("Error fetching foods:", error);
      }
    };

    fetchFoods();
  }, []);

  const handleView = (food) => {
    console.log("Navigating to food with ID:", food._id);
    navigate(`/food/${food._id}`);
  };

  return (
    <Layout>
      <section className="FoodCardSection">
        <div className="FoodCardHeader">
          <h4>Foods</h4>
          <h6>Explore Delicious Foods Near You</h6>
        </div>
        <div className="FoodCardContainer">
          {foods.map((food) => (
            <div className="FoodCardBody" key={food._id}>
              <div className="FoodImg">
                <img src={food.foodImage.data || ""} alt={food.foodTitle} />
              </div>
              <div className="FoodTitle">
                <p className="FoodName">{food.foodTitle}</p>
                <div className="extraInfo">
                  <p>{food.foodDescription}</p>
                  <p>{food.}</p>

                  {/* <span onClick={() => handleView(food)} className="viewMore">
                    View More
                  </span> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default FoodCard;
