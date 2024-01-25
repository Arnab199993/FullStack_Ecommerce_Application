import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";

const UpdateProducts = () => {
  // const BASE_URL = "http://localhost:5000";
  const BASE_URL = "https://fullstack-ecommerce-application.onrender.com";
  const defaultData = {
    name: "",
    price: "",
    category: "",
    company: "",
    userId: "",
  };
  const [productData, setProductData] = useState(defaultData);
  const storedData = JSON.parse(localStorage.getItem("user")) || {};
  const userToken = localStorage.getItem("token");

  const navigate = useNavigate();

  const [editData, setEditData] = useState("");
  const params = useParams();

  const handleChange = (event) => {
    setProductData({ ...productData, [event.target.name]: event.target.value });
  };

  const handleClick = async () => {
    try {
      let res = await fetch(`${BASE_URL}/product/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...productData,
          userId: storedData._id,
        }),
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${userToken}`,
        },
      });
      res = await res.json();
      console.log("ressss", res);
    } catch (error) {
      console.log(error);
    }
    navigate("/");
  };

  const getProductDetails = async () => {
    const res = await fetch(`${BASE_URL}/product/${params.id}`, {
      headers: {
        authorization: `bearer ${userToken}`,
      },
    });
    const data = await res.json();
    if (data) {
      setEditData(data);
      setProductData(data);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  return (
    <>
      <div style={{ textAlign: "center", margin: "auto", width: "500px" }}>
        <h1>Update Products</h1>
        <TextField
          style={{ margin: "1rem" }}
          type="text"
          placeholder="Enter Product Name"
          onChange={handleChange}
          name="name"
          value={productData.name}
          sx={{ width: "400px" }}
        />

        <TextField
          style={{ margin: "1rem" }}
          type="text"
          placeholder="Enter Product Price"
          onChange={handleChange}
          name="price"
          value={productData.price}
          sx={{ width: "400px" }}
        />

        <TextField
          style={{ margin: "1rem" }}
          type="text"
          placeholder="Enter Product Category"
          onChange={handleChange}
          name="category"
          value={productData.category}
          sx={{ width: "400px" }}
        />

        <TextField
          style={{ margin: "1rem" }}
          type="text"
          placeholder="Enter Product Company"
          onChange={handleChange}
          name="company"
          value={productData.company}
          sx={{ width: "400px" }}
        />

        <Button
          onClick={handleClick}
          style={{ marginTop: "0.5rem", marginBottom: "1rem" }}
          variant="contained"
          color="primary"
        >
          Update Product
        </Button>
      </div>
    </>
  );
};

export default UpdateProducts;
