import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
const BASE_URL = "http://localhost:5000";
const Product = () => {
  const [product, setProduct] = useState([]);

  const fetchData = async () => {
    const res = await fetch(`${BASE_URL}/productsList`);
    const data = await res.json();

    if (data?.length) {
      setProduct(data);
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
        </ul>
        {product.length ? (
          product.map((productList, i) => (
            <ul>
              <li>{i + 1} </li>
              <li>{productList.name} </li>
              <li>{productList.company} </li>
              <li>{productList.category} </li>
              <li>$ {productList.price}</li>
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
