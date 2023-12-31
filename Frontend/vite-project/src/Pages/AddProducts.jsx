import React, { useState } from "react";
const AddProducts = () => {
  const BASE_URL = "http://localhost:5000";
  const defaultData = {
    name: "",
    price: "",
    category: "",
    company: "",
    userId: "",
  };
  const [productData, setProductData] = useState(defaultData);
  const [error, setError] = useState(false);
  const storedData = JSON.parse(localStorage.getItem("user")) || {};
  const handleChange = (event) => {
    setProductData({ ...productData, [event.target.name]: event.target.value });
  };
  const handleClick = async () => {
    const data = JSON.stringify({
      name: productData.name,
      price: productData.price,
      category: productData.category,
      company: productData.company,
      userId: storedData._id,
    });
    console.log("dataaaaa", data);
    if (
      !productData.category ||
      !productData.company ||
      !productData.name ||
      !productData.price
    ) {
      setError(true);
      return false;
    }
    let res = await fetch(`${BASE_URL}/add-product`, {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
    res = await res.json();
    console.log("ressss", res);
    setProductData(defaultData);
  };
  return (
    <>
      <div className="product">
        <h1> Add Products</h1>
        <input
          className="inputBox"
          type="text"
          placeholder="Enter Product Name"
          onChange={handleChange}
          name="name"
          value={productData.name}
        />
        {error && !productData.name ? (
          <span className="invalid-input">Enter Valid Name</span>
        ) : (
          ""
        )}
        <input
          className="inputBox"
          type="text"
          placeholder="Enter Product Price"
          onChange={handleChange}
          name="price"
          value={productData.price}
        />
        {error && !productData.price ? (
          <span className="invalid-input">Enter Valid Price</span>
        ) : (
          ""
        )}
        <input
          className="inputBox"
          type="text"
          placeholder="Enter Product Category"
          onChange={handleChange}
          name="category"
          value={productData.category}
        />
        {error && !productData.category ? (
          <span className="invalid-input">Enter Valid Category</span>
        ) : (
          ""
        )}
        <input
          className="inputBox"
          type="text"
          placeholder="Enter Product Company"
          onChange={handleChange}
          name="company"
          value={productData.company}
        />
        {error && !productData.company ? (
          <span className="invalid-input">Enter Valid Company</span>
        ) : (
          ""
        )}
        <button onClick={handleClick} className="appButton">
          Add Product
        </button>
      </div>
    </>
  );
};

export default AddProducts;
