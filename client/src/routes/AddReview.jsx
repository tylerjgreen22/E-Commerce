import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import productsAPI from "../apis/productsAPI";
import Header from "../components/Header";
import { ProductsContext } from "../context/ProductsContext";

const AddReview = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { selectedProduct } = useContext(ProductsContext);
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("Rating");

  //on submit makes post call to api to add a review
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await productsAPI.post(`/${id}`, {
        name,
        review,
        rating,
      });
    } catch (err) {
      console.log(err);
    }

    navigate(`/${id}`);
  };

  //renders a form that allows users to enter info in for a review
  return (
    <div className="container">
      <Header />
      <h1>Adding Review for: {selectedProduct.name}</h1>
      <form action="">
        <div className="form-row">
          <div className="col">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Name"
            />
          </div>
          <div className="col mt-3">
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="form-control"
              placeholder="Review"
            />
          </div>
          <div className="col mt-3">
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="custom-select"
            >
              <option disabled>Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary mt-3"
          >
            Add Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReview;
