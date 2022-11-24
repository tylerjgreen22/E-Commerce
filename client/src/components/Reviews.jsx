import React from "react";
import StarRating from "./StarRating";

const Reviews = ({ review }) => {
  //renders a review by getting the reviews from the product page as a prop and using that review to render the information
  return (
    <div className="container">
      <div className="card mt-3">
        <div className="card-body">
          <h3 className="card-title">{review.name}</h3>
          <p className="card-text">{review.review}</p>
          <StarRating rating={review.rating} />
        </div>
      </div>
    </div>
  );
};

export default Reviews;
