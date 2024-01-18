import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Debounce } from "../Optimization/Debounce";

const BASE_URL = "http://localhost:5000";

const Product = () => {
  const [product, setProduct] = useState([]);
  const [file, setFile] = useState([]);
  const navigate = useNavigate();
  console.log("fileeee", file);
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
  const fetchFiles = async () => {
    try {
      const data = await fetch(`${BASE_URL}/view-files`, {
        method: "GET",
        headers: {
          authorization: `bearer ${localStorage.getItem("token")}`,
        },
      });
      const response = await data.json();

      if (response) {
        console.log("responseeee", response);
        setFile(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    let result = await fetch(`${BASE_URL}/product/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
    });
    result = await result.json();
    if (result) {
      fetchData();
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
  useEffect(() => {
    fetchFiles();
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
                {file ? (
                  <div>
                    {file?.map((fileData) => (
                      <img key={fileData?._id} src={fileData?.file} />
                    ))}
                  </div>
                ) : (
                  "No file found"
                )}
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
