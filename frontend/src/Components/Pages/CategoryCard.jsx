import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Css/CatCard.css";

const CategoryCard = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/category/getAll"
        );
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="CatCardSection">
      <div className="CatCardDiv">
        <div className="CatHeader">
          <h4>Collections</h4>
          <h6>Explore curated lists of Food Categories based on trends</h6>
        </div>
        <div className="CatCardContainer">
          {categories.map((category) => (
            <div className="CardBody" key={category.id}>
              <div className="catImg">
                <img src={category.catImage} alt={category.catName} />
              </div>
              <div className="catOverlay">
                <div className="catTitle">
                  <p className="catName">{category.catName}</p>
                  <Link to={`/category/${category._id}`} className="viewLink">
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCard;
