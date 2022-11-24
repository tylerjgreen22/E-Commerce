import React, { useState } from "react";
import productsAPI from "../apis/productsAPI";
import Header from "../components/Header";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [response, setResponse] = useState("");

  //on submit, makes post call to api to add a product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await productsAPI.post("/", {
        name,
        image: null,
        description,
        price,
        category: null,
      });
      setResponse(response);
    } catch (err) {
      console.log(err);
    }
  };

  //renders a form that allows users to enter in product info and then submit the procucts. alert pops up on product add.
  return (
    <div className="container">
      <Header />
      {response && (
        <div
          className="alert alert-primary alert-dismissible fade show"
          role="alert"
        >
          {response.data}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
          ></button>
        </div>
      )}

      <form action="">
        <div className="form-row">
          <div className="col">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
              placeholder="name"
            />
          </div>
          <div className="col mt-3">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-control"
              placeholder="description"
            />
          </div>
          <div className="col mt-3">
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              className="form-control"
              placeholder="price"
            />
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary mt-3"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
