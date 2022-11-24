import React, { useState, useContext, useEffect } from "react";
import Header from "../components/Header";
import { ProductsContext } from "../context/ProductsContext";
import productsAPI from "../apis/productsAPI";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { cart } = useContext(ProductsContext);
  const { name, setName, email, setEmail, address, setAddress } =
    useContext(ProductsContext);
  let total = 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await productsAPI.get("/login");
        if (response.data.loggedIn === true) {
          setName(response.data.user);
          setEmail(response.data.email);
          setAddress(response.data.address);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (e) => {
    navigate("/checkout");
  };

  //renders a page that allows users to see items added to their cart. displays the total
  return (
    <div className="container">
      <Header />
      {cart.map((product, idx) => {
        total += product.price;
        return (
          <div key={idx} className="row">
            <img
              src={
                product.image
                  ? `http://localhost:3000/img/${product.image}`
                  : "https://via.placeholder.com/640"
              }
              alt={product.name}
              className="img-thumbnail m-3"
              style={{ height: 160, width: 160 }}
            ></img>
            <h2>{product.name}</h2>
            <p>${product.price}</p>
          </div>
        );
      })}
      <h3>Total: ${total}</h3>
      <h3>Checkout information:</h3>
      <form action="">
        <div className="form-row">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="form-control"
            placeholder={name ? name : "Name"}
          />
        </div>
        <div className="form-row mt-3">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-control"
            placeholder={email ? email : "E-mail"}
          />
        </div>
        <div className="form-row mt-3">
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            className="form-control"
            placeholder={address ? address : "Address"}
          />
        </div>
        <div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary mt-3"
          >
            Checkout
          </button>
        </div>
      </form>
    </div>
  );
};

export default Cart;
