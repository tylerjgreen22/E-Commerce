import React, { useState } from "react";
import Header from "../components/Header";
import productsAPI from "../apis/productsAPI";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInMessage, setLoggedInMessage] = useState("");

  //on submit makes a post call to the api to log in the user
  const handleLoginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await productsAPI.post("/login", {
        email,
        password,
      });
      if (response.data[0].name) {
        navigate("/");
      }
    } catch (err) {
      console.log(err.response.data);
      setLoggedInMessage(err.response.data);
    }
  };

  //on click takes the user to the register page
  const handleRegister = (e) => {
    navigate("/register");
  };

  //renders a log in form and tells the user if their email/password is incorrect, or sends user back to home if login is successful
  return (
    <div className="container">
      <Header />
      <h1>Login</h1>
      <form action="">
        <div className="form-row mt-3">
          <label htmlFor="email">Email</label> <br />
          <input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="form-row mt-3">
          <label htmlFor="Password">Password</label> <br />
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button
          className="btn btn-primary mt-3"
          onClick={(e) => handleLoginUser(e)}
        >
          Log in
        </button>
      </form>
      <button
        className="btn btn-primary mt-3"
        onClick={(e) => {
          handleRegister(e);
        }}
      >
        {" "}
        Register
      </button>
      <h3>{loggedInMessage}</h3>
    </div>
  );
};

export default Login;
