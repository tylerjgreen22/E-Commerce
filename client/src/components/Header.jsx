import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const handleSelection = () => {
    navigate("/");
  };

  //renders a header that will send users to homepage on click
  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="col-6">
          <h1
            className="display-1"
            onClick={() => handleSelection()}
            role="button"
          >
            faux <small className="text-primary">store</small>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
