import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";

import "../Css/RestId.css";

const RestId = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/restraunts/get/${id}`
        );
        setRestaurant(response.data.restWithImg);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };

    fetchRestaurant();
  }, [id]);

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  const { restTitle, restCode, restImage, restMenu, restCoords, restRating } =
    restaurant;

  return (
    <div className="RestIdSection">
      <div className="restaurantDetailContainer">
        <h1 className="restaurantTitle">{restTitle}</h1>
        <p className="restaurantCode">Code: {restCode}</p>

        {/* Image Carousel */}
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {restImage.map((img, index) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <img src={img.data} className="d-block w-100" alt={restTitle} />
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        {/* Menu Table */}
        <table className="menuTable">
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {restMenu.map((item, index) => (
              <tr key={index}>
                <td>{item.item}</td>
                <td>${item.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Address Section */}
        <div className="restaurantAddress">
          <h3>Address</h3>
          <p>{restCoords.address}</p>
        </div>

        {/* Rating Section */}
        <div className="restaurantRating">
          <h3>Rating</h3>
          <div className="starRating">
            {Array.from({ length: 5 }, (_, index) => (
              <FaStar
                key={index}
                color={index < restRating ? "#FFD700" : "#ccc"}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestId;
