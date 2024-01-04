import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Debounce } from "../Optimization/Debounce";

const BASE_URL = "http://localhost:5000";

const Product = () => {
  const [product, setProduct] = useState([]);
  const [searchData, setSearchData] = useState("");
  console.log("searchDataaa", searchData);
  const navigate = useNavigate();

  const fetchData = async () => {
    const res = await fetch(`${BASE_URL}/productsList`);
    const data = await res.json();
    if (data.length > 0) {
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

  const deBounceHandleSearch = Debounce(async (searchText) => {
    if (searchText.trim() === "") {
      return;
    }
    const searchResult = await fetch(
      `${BASE_URL}/search/${searchText.toLowerCase()}`
    );
    const data = await searchResult.json();
    if (data.length > 0) {
      setSearchData(data);
    }
  }, 500);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="product-list">
        <h1>Product Component</h1>
        <input
          className="search-box"
          type="text"
          onChange={(e) => deBounceHandleSearch(e.target.value)}
        />
        <ul>
          <li>Sl. No </li>
          <li>Name </li>
          <li>Company </li>
          <li>Category </li>
          <li>Price</li>
          <li>Operation</li>
        </ul>
        {searchData.length > 0
          ? searchData.map((productList, i) => (
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
          : searchData.length === 0 &&
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
            ))}
      </div>
    </>
  );
};

export default Product;
