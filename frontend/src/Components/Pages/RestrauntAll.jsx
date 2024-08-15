import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Css/RestCard.css";

const RestCards = () => {
  const [Rests, setRests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/restraunts/get/All"
        );
        setRests(response.data.restWithImg);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurants();
  }, []);

const handleView = (restWithImg) => {
  console.log("Navigating to restaurant with ID:", restWithImg._id); 
  navigate(`/restaurant/${restWithImg._id}`); 
};

  return (
    <section className="RestCardSection">
      <div className="RestCardHeader">
        <h4>Restaurants</h4>
        <h6>Explore Restaurants near you</h6>
      </div>
      <div className="RestCardContainer">
        {Rests.map((restWithImg) => (
          <div className="RestCardBody" key={restWithImg._id}> 
            <div className="RestImg">
              <img
                src={restWithImg.restImage[0]?.data || ""}
                alt={restWithImg.restTitle}
              />
            </div>
            <div className="RestTitle">
              <p className="RestName">{restWithImg.restTitle}</p>
              <div className="extraInfo">
                <p>{restWithImg.isOpen ? "Open Now" : "Closed"}</p>
                <span
                  onClick={() => handleView(restWithImg)}
                  className="viewMore"
                >
                  View More
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RestCards;
