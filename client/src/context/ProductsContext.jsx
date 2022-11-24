import React, { useState, createContext } from "react";

export const ProductsContext = createContext();

export const ProductsContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [selectedProductReviews, setSelectedProductReviews] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInMessage, setLoggedInMessage] = useState("");
  const [cart, setCart] = useState([]);
  const [admin, setAdmin] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
        selectedProduct,
        setSelectedProduct,
        selectedProductReviews,
        setSelectedProductReviews,
        loggedInMessage,
        setLoggedInMessage,
        cart,
        setCart,
        admin,
        setAdmin,
        loggedIn,
        setLoggedIn,
        name,
        setName,
        email,
        setEmail,
        address,
        setAddress,
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
};
