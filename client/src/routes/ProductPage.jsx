import React, { useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import productsAPI from "../apis/productsAPI";
import Header from "../components/Header";
import Reviews from "../components/Reviews";
import StarRating from "../components/StarRating";
import { ProductsContext } from "../context/ProductsContext";

const ProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    selectedProduct,
    setSelectedProduct,
    selectedProductReviews,
    setSelectedProductReviews,
    cart,
    setCart,
    admin,
    setAdmin,
  } = useContext(ProductsContext);
  const [cartAlert, setCartAlert] = useState(false);

  //on page load, checks if the user is logged in
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await productsAPI.get(`/${id}`);
        setSelectedProduct(response.data.product);
        setSelectedProductReviews(response.data.reviews);
        const login = await productsAPI.get("/login");
        if (login.data.loggedIn === true) {
          setAdmin(login.data.isadmin);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  //on click, makes delete call to api to delete a product
  const handleDelete = async (e, id) => {
    navigate("/");
    e.stopPropagation();
    try {
      const response = await productsAPI.delete(`/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  //on click, send user to update product page
  const handleUpdate = (e, id) => {
    e.stopPropagation();
    navigate(`/${id}/updateProduct`);
  };

  //on click, adds the selected product to the users cart
  const handleAddToCart = (e) => {
    e.stopPropagation();
    setCart([...cart, selectedProduct]);
    setCartAlert(true);
  };

  //on click, send the user to the add review page
  const handleAddReview = (e, id) => {
    e.stopPropagation();
    navigate(`/${id}/addReview`);
  };

  //renders a page that displays the selected product. displays buttons to add product to cart and update or delete the prodcuct if user is admin. allows users to add reviews for products
  return (
    <div className="container">
      <Header />
      {cartAlert && (
        <div
          className="alert alert-primary alert-dismissible fade show"
          role="alert"
        >
          Item added to cart
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            onClick={() => setCartAlert(false)}
          ></button>
        </div>
      )}
      <div className="row mt-5">
        <div className="col">
          <img
            src={
              selectedProduct.image
                ? `http://localhost:3000/img/${selectedProduct.image}`
                : "https://via.placeholder.com/640"
            }
            alt={selectedProduct.name}
            className="img-thumbnail"
            style={{ height: 500 }}
          ></img>
        </div>
        <div className="col">
          <h1 className="display-2">{selectedProduct.name}</h1>
          <p>{selectedProduct.description}</p>
          <h2>${selectedProduct.price}</h2>
          <div>
            Rating: <StarRating rating={selectedProduct.average_rating} />
            <span>
              {selectedProduct.count ? `(${selectedProduct.count})` : "(0)"}
            </span>
          </div>
        </div>
      </div>
      <button
        onClick={(e) => handleAddToCart(e)}
        className="btn btn-primary mt-3 me-3"
      >
        Add to Cart
      </button>
      {admin && (
        <button
          onClick={(e) => handleUpdate(e, id)}
          className="btn btn-warning mt-3 me-3"
        >
          Update Product
        </button>
      )}
      {admin && (
        <button
          onClick={(e) => handleDelete(e, id)}
          className="btn btn-danger mt-3 me-3"
        >
          Delete Product
        </button>
      )}
      {selectedProductReviews.map((review, idx) => {
        return (
          <div className="row text-black" key={idx}>
            <Reviews review={review} />
          </div>
        );
      })}
      <div className="col">
        <button
          onClick={(e) => handleAddReview(e, id)}
          className="btn btn-primary mt-3"
        >
          Add Review
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
