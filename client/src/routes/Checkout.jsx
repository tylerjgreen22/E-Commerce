import React, { useContext } from "react";
import Header from "../components/Header";
import { ProductsContext } from "../context/ProductsContext";

const Checkout = () => {
  const { name, email, address } = useContext(ProductsContext);

  //renders a checkout page
  return (
    <div className="container">
      <Header />
      Thanks for your order, {name}. <br />
      It will be sent to {address} and you will get an email confirmation
      shortly to {email}
    </div>
  );
};

export default Checkout;
