import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import productsAPI from "../apis/productsAPI";
import Header from "../components/Header";

const Register = () => {
  const navigate = useNavigate();
  const [nameReg, setNameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [addressReg, setAddressReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [response, setResponse] = useState("");

  //on click, makes a post call to api to register a user using provided details, and navigates users to login after registration
  const handleSubmitUser = async (e) => {
    e.preventDefault();
    try {
      const response = await productsAPI.post("/register", {
        name: nameReg,
        email: emailReg,
        password: passwordReg,
        address: addressReg,
      });
      if (response.status === 200) {
        setResponse(response.data);
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  //renders a form to collect information from users to create a user. stops registration if there is a duplicate email.
  return (
    <div className="container">
      <Header />
      <h1>Register</h1>
      <form action="">
        <div className="form-row mt-3">
          <label htmlFor="name">Name</label> <br />
          <input
            type="text"
            onChange={(e) => {
              setNameReg(e.target.value);
            }}
          />
        </div>
        <div className="form-row mt-3">
          <label htmlFor="email">Email</label> <br />
          <input
            type="email"
            onChange={(e) => {
              setEmailReg(e.target.value);
            }}
          />
        </div>
        <div className="form-row mt-3">
          <label htmlFor="Address">Address</label> <br />
          <input
            type="text"
            onChange={(e) => {
              setAddressReg(e.target.value);
            }}
          />
        </div>
        <div className="form-row mt-3">
          <label htmlFor="Password">Password</label> <br />
          <input
            type="password"
            onChange={(e) => {
              setPasswordReg(e.target.value);
            }}
          />
        </div>
        <button
          className="btn btn-primary mt-3"
          onClick={(e) => handleSubmitUser(e)}
        >
          Register
        </button>
      </form>
      <h3>{response}</h3>
    </div>
  );
};

export default Register;
