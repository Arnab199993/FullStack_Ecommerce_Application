import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProducts = () => {
  const BASE_URL = "http://localhost:5000";
  const defaultData = {
    name: "",
    price: "",
    category: "",
    company: "",
    userId: "",
  };
  const [productData, setProductData] = useState(defaultData);
  const storedData = JSON.parse(localStorage.getItem("user")) || {};
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
    const res = await fetch(`${BASE_URL}/product/${params.id}`);
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
      <div className="product">
        <h1> Update Products</h1>
        <input
          className="inputBox"
          type="text"
          placeholder="Enter Product Name"
          onChange={handleChange}
          name="name"
          value={productData.name}
        />

        <input
          className="inputBox"
          type="text"
          placeholder="Enter Product Price"
          onChange={handleChange}
          name="price"
          value={productData.price}
        />

        <input
          className="inputBox"
          type="text"
          placeholder="Enter Product Category"
          onChange={handleChange}
          name="category"
          value={productData.category}
        />

        <input
          className="inputBox"
          type="text"
          placeholder="Enter Product Company"
          onChange={handleChange}
          name="company"
          value={productData.company}
        />

        <button onClick={handleClick} className="appButton">
          Update Product
        </button>
      </div>
    </>
  );
};

export default UpdateProducts;
