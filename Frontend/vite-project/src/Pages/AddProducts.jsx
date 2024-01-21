import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {
  const storedData = JSON.parse(localStorage.getItem("user")) || {};
  const BASE_URL = "http://localhost:5000";
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
    console.log("Productssaaaa", productData);

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
        <input
          onChange={(e) =>
            setProductData({ ...productData, file: e.target.files[0] })
          }
          type="file"
          required
        />
        <button onClick={handleClick} className="appButton">
          Add Product
        </button>
      </div>
    </>
  );
};

export default AddProducts;
