import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import productsAPI from "../apis/productsAPI";
import Header from "../components/Header";

const UpdateProduct = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [response, setResponse] = useState("");

  //on page load, makes a get call to the api to get the product that needs to be updated
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await productsAPI.get(`/${id}`);
        setName(response.data.product.name);
        setDescription(response.data.product.description);
        setPrice(response.data.product.price);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  //on submit, makes a put call to the api to update the selected product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await productsAPI.put(`/${id}`, {
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

  //renders a form to allow for updating of products. makes an alert when product is successfully updated
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
            />
          </div>
          <div className="col mt-3">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="col mt-3">
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              className="form-control"
            />
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-warning mt-3"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
