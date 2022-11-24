import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import productsAPI from "../apis/productsAPI";
import { ProductsContext } from "../context/ProductsContext";
import StarRating from "./StarRating";

const ProductList = () => {
  const { products, setProducts } = useContext(ProductsContext);
  const navigate = useNavigate();

  //on page load, makes a get call to the api to get all products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await productsAPI.get("/");
        setProducts(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  //on click, sends users to product page for the specific product they clicked on
  const handleSelection = (id) => {
    navigate(`/${id}`);
  };

  //renders the products rating by getting the average rating from the api and passing to star rating component
  const renderRating = (product) => {
    if (!product.count) {
      return <span>No Reviews</span>;
    }
    return (
      <>
        <StarRating rating={product.average_rating} />
        <span>({product.count})</span>
      </>
    );
  };

  //renders all products in card format
  return (
    <div className="container">
      <div className="row">
        {products &&
          products.map((product, idx) => {
            return (
              <div className="col-3 mt-3" key={idx}>
                <div
                  className="card text-bg-light border-dark"
                  onClick={() => handleSelection(product.product_id)}
                  role="button"
                >
                  <img
                    src={
                      product.image
                        ? `http://localhost:3000/img/${product.image}`
                        : "https://via.placeholder.com/640"
                    }
                    alt={product.name}
                    className="card-img-top"
                  ></img>
                  <div className="card-body" style={{ height: 200 }}>
                    <h2 className="card-title">{product.name}</h2>
                    <div className="card-text">{product.description}</div>
                  </div>
                  <div className="card-footer">
                    <p>Price: ${product.price}</p>
                    <div>Reviews: {renderRating(product)}</div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ProductList;
