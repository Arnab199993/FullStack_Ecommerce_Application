import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Debounce } from "../Optimization/Debounce";

const BASE_URL = "http://localhost:5000";

const Product = () => {
  const [product, setProduct] = useState([]);
  console.log("producttt", product);

  const storedData = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const res = await fetch(`${BASE_URL}/productsList`, {
        headers: {
          authorization: `bearer ${storedData}`,
        },
      });
      const data = await res.json();
      if (data?.length > 0) {
        setProduct(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    console.log("handleDeleteee");
    try {
      let result = await fetch(`${BASE_URL}/product/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${localStorage.getItem("token")}`,
        },
      });
      result = await result.json();
      if (result && result.deletedCount > 0) {
        await fetchData();
      } else {
        console.log("Delete operation failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deBounceHandleSearch = Debounce(async (searchText) => {
    if (searchText.trim() !== "") {
      const searchResult = await fetch(
        `${BASE_URL}/search/${searchText.toLowerCase()}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await searchResult.json();
      if (data.length > 0) {
        setProduct(data);
      } else {
        setProduct([]);
      }
    } else {
      fetchData();
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
          <li>Photos</li>
        </ul>
        {product?.length > 0 ? (
          product?.map((productList, i) => (
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
              <li>
                <img
                  key={productList?._id}
                  src={`${BASE_URL}/${productList?.files}`}
                  alt={productList?.files}
                  height={40}
                  width={40}
                />
              </li>
            </ul>
          ))
        ) : (
          <h1>No result found</h1>
        )}
      </div>
    </>
  );
};

export default Product;
