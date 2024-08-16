import React, { useEffect, useState } from "react";
import { Table, Image, Rate } from "antd";
import axios from "axios";

const RestRA = () => {
  const [restaurants, setRestaurants] = useState([]);
useEffect(() => {
  const fetchRestaurants = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/restraunts/get/All"
      );
      console.log(response.data); // Log the entire response to check the structure
      setRestaurants(response.data.restaurants); // Ensure `restaurants` matches the correct key in the response
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  fetchRestaurants();
}, []);


  const columns = [
    {
      title: "Name",
      dataIndex: "restTitle",
      key: "restTitle",
    },
    {
      title: "Logo",
      dataIndex: "restLogo",
      key: "restLogo",
      render: (text, record) => (
        <Image
          width={50}
          src={record.restLogo}
          alt={`${record.restTitle} Logo`}
          placeholder={<Image preview={false} src="fallback-url" width={50} />}
        />
      ),
    },
    {
      title: "Operating Time",
      dataIndex: "restTime",
      key: "restTime",
    },
    {
      title: "Rating",
      dataIndex: "restRating",
      key: "restRating",
      render: (rating) => <Rate disabled defaultValue={rating} />,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={restaurants}
      rowKey={(record) => record._id}
    />
  );
};

export default RestRA;
