import React, { useEffect, useState } from "react";
const ProductContext = React.createContext(null);
export const useProductContext = () => React.useContext(ProductContext);
// const BASE_URL = "http://localhost:5000";
const BASE_URL = "https://fullstack-ecommerce-application.onrender.com";
const ProductContextProvider = ({ children }) => {
  const [product, setProduct] = useState([]);

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

  return (
    <ProductContext.Provider value={{ fetchData, product, setProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
export default ProductContextProvider;
