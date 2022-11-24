import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProductsContextProvider } from "./context/ProductsContext";
import AddProduct from "./routes/AddProduct";
import AddReview from "./routes/AddReview";
import Cart from "./routes/Cart";
import Home from "./routes/Home";
import Register from "./routes/Register";
import ProductPage from "./routes/ProductPage";
import UpdateProduct from "./routes/UpdateProduct";
import Login from "./routes/Login";
import Checkout from "./routes/Checkout";

const App = () => {
  return (
    <ProductsContextProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/:id" exact element={<ProductPage />} />
            <Route path="/addProduct" exact element={<AddProduct />} />
            <Route
              path="/:id/updateProduct"
              exact
              element={<UpdateProduct />}
            />
            <Route path="/cart" exact element={<Cart />} />
            <Route path="/:id/addReview" exact element={<AddReview />} />
            <Route path="/register" exact element={<Register />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/checkout" exact element={<Checkout />} />
          </Routes>
        </Router>
      </div>
    </ProductsContextProvider>
  );
};

export default App;
