import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";
const BASE_URL = "http://localhost:5000";
const Product = () => {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  const fetchData = async () => {
    const res = await fetch(`${BASE_URL}/productsList`);
    const data = await res.json();

    if (data?.length) {
      setProduct(data);
    }
  };
  const handleDelete = async (id) => {
    let result = await fetch(`${BASE_URL}/product/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result) {
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="product-list">
        <h1>Product Component</h1>
        <ul>
          <li>Sl. No </li>
          <li>Name </li>
          <li>Company </li>
          <li>Category </li>
          <li>Price</li>
          <li>Operation</li>
        </ul>
        {product.length ? (
          product.map((productList, i) => (
            <ul key={productList._id}>
              <li>{i + 1} </li>
              <li>{productList.name} </li>
              <li>{productList.company} </li>
              <li>{productList.category} </li>
              <li>$ {productList.price}</li>
              <li>
                <button onClick={() => handleDelete(productList._id)}>
                  Delete
                </button>
                <Link to={`/update/${productList._id}`}>Update</Link>
              </li>
            </ul>
          ))
        ) : (
          <h3>No data found</h3>
        )}
      </div>
    </>
  );
};

export default Product;
