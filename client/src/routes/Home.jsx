import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ProductList from "../components/ProductList";
import productsAPI from "../apis/productsAPI";
import { ProductsContext } from "../context/ProductsContext";

const Home = () => {
  const { loggedIn, setLoggedIn, admin, setAdmin } =
    useContext(ProductsContext);
  const navigate = useNavigate();

  // on click takes the user to the add product page
  const handleAdd = (e) => {
    e.stopPropagation();
    navigate("/addProduct");
  };

  //on click takes the user to the cart page
  const handleCart = (e) => {
    e.stopPropagation();
    navigate("/cart");
  };

  //on click takes the user to the login page
  const handleLogIn = (e) => {
    e.stopPropagation();
    navigate("/login");
  };

  //on click makes a call to the api to log the user out by clearing the session
  const handleLogOut = async (e) => {
    e.stopPropagation();
    window.location.reload();
    try {
      const response = await productsAPI.get("/logout");
    } catch (err) {
      console.log(err);
    }
  };

  //on page load makes a call to the api to see if the user is logged in
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await productsAPI.get("/login");
        if (response.data.loggedIn === true) {
          setLoggedIn(response.data.user);
          setAdmin(response.data.isadmin);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  //renders the product list, as well as buttons to login or logout, as well as a button to add products if the user is an admin, and view cart
  return (
    <div>
      <Header />
      <div className="container">
        {loggedIn ? (
          <div>
            <p>Hello, {loggedIn && loggedIn}</p>
            <button
              className="btn btn-primary mt-3"
              onClick={(e) => {
                handleLogOut(e);
              }}
            >
              Log Out
            </button>
          </div>
        ) : (
          <button
            className="btn btn-primary mt-3"
            onClick={(e) => {
              handleLogIn(e);
            }}
          >
            Log In
          </button>
        )}
        <br />
        {admin && (
          <button
            onClick={(e) => {
              handleAdd(e);
            }}
            className="btn btn-primary mt-2"
          >
            Add Product
          </button>
        )}
      </div>
      <div className="container">
        <button
          onClick={(e) => {
            handleCart(e);
          }}
          className="btn btn-primary mt-2"
        >
          Cart
        </button>
      </div>

      <ProductList />
    </div>
  );
};

export default Home;
