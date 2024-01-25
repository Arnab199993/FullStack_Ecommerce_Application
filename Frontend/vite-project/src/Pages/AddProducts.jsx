import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";

const AddProducts = () => {
  const storedData = JSON.parse(localStorage.getItem("user")) || {};
  // const BASE_URL = "http://localhost:5000";
  const BASE_URL = "https://fullstack-ecommerce-application.onrender.com";
  const defaultData = {
    name: "",
    price: "",
    category: "",
    company: "",
    userId: storedData._id,
    file: null,
  };
  const [productData, setProductData] = useState(defaultData);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    if (event.target.name === "file") {
      setProductData({ ...productData, file: event.target.files[0] });
    } else {
      setProductData({
        ...productData,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleClick = async () => {
    try {
      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("price", productData.price);
      formData.append("category", productData.category);
      formData.append("company", productData.company);
      formData.append("file", productData.file);
      if (
        !productData.category ||
        !productData.company ||
        !productData.name ||
        !productData.price ||
        !productData.file
      ) {
        setError(true);
        return false;
      }
      let res = await fetch(`${BASE_URL}/add-product`, {
        method: "POST",
        body: formData,
        headers: {
          authorization: `bearer ${localStorage.getItem("token")}`,
        },
      });
      res = await res.json();
      console.log("resssss", res);
      if (res && productData.file) {
        setProductData(defaultData);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ textAlign: "center", margin: "auto", width: "500px" }}>
      <h1> Add Products</h1>
      <TextField
        style={{ marginBottom: "10px" }}
        label="Enter Product Name"
        onChange={handleChange}
        name="name"
        value={productData.name}
        sx={{ width: "400px" }}
      />
      {error && !productData.name ? (
        <span style={{ color: "red" }}>Enter Valid Name</span>
      ) : (
        ""
      )}
      <TextField
        style={{ marginBottom: "10px" }}
        label="Enter Product Price"
        onChange={handleChange}
        name="price"
        value={productData.price}
        sx={{ width: "400px" }}
      />
      {error && !productData.price ? (
        <span style={{ color: "red" }}>Enter Valid Price</span>
      ) : (
        ""
      )}
      <TextField
        style={{ marginBottom: "10px" }}
        label="Enter Product Category"
        onChange={handleChange}
        name="category"
        value={productData.category}
        sx={{ width: "400px" }}
      />
      {error && !productData.category ? (
        <span style={{ color: "red" }}>Enter Valid Category</span>
      ) : (
        ""
      )}
      <TextField
        style={{ marginBottom: "10px" }}
        label="Enter Product Company"
        onChange={handleChange}
        name="company"
        value={productData.company}
        sx={{ width: "400px" }}
      />
      {error && !productData.company ? (
        <span style={{ color: "red" }}>Enter Valid Company</span>
      ) : (
        ""
      )}
      <input
        onChange={(e) =>
          setProductData({ ...productData, file: e.target.files[0] })
        }
        type="file"
        required
      />
      <Button
        onClick={handleClick}
        variant="contained"
        style={{ marginTop: "15px" }}
      >
        Add Product
      </Button>
    </div>
  );
};

export default AddProducts;
