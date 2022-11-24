require("dotenv").config();
const pool = require("../../db/index");
const queries = require("./queries");
const bcrypt = require("bcrypt");

//queries database for all products and returns response of results
const getProducts = (req, res) => {
  pool.query(queries.getProducts, (err, results) => {
    if (err) throw err;
    res.status(200).json(results.rows);
  });
};

//queries database for one product and returns response of product and reviews for that product
const getOneProduct = async (req, res) => {
  try {
    const product = await pool.query(queries.getOneProduct, [req.params.id]);
    const reviews = await pool.query(queries.getProductReviews, [
      req.params.id,
    ]);
    res.status(200).json({ product: product.rows[0], reviews: reviews.rows });
  } catch (err) {
    console.log(err);
  }
};

//queries database to add product based on request body. returns a response of successful creation
const addProduct = (req, res) => {
  const { name, image, description, price, category } = req.body;
  pool.query(
    queries.addProduct,
    [name, image, description, price, category],
    (err, results) => {
      if (err) throw err;
      res.status(201).send("Product successfully created");
    }
  );
};

//queries database to update product based on request body. returns a response of successful update
const updateProduct = (req, res) => {
  const id = req.params.id;
  const { name, image, description, price, category } = req.body;
  pool.query(
    queries.updateProduct,
    [name, image, description, price, category, id],
    (err, results) => {
      if (err) throw err;
      res.status(200).send("Product updated successfully");
    }
  );
};

//queries database to delete product based on request params.
const deleteProduct = (req, res) => {
  const id = req.params.id;
  pool.query(queries.deleteProduct, [id], (err, results) => {
    if (err) throw err;
    res.status(204);
  });
};

//queries database to add review based on request body. returns a response of successful creation
const addReview = (req, res) => {
  const id = req.params.id;
  const { name, review, rating } = req.body;
  pool.query(queries.addReview, [name, review, rating, id], (err, results) => {
    if (err) throw err;
    res.status(201).send("Review added successfully");
  });
};

//queries database to add user based on request body. encrypts user password. returns a response of successful creation
const addUser = async (req, res) => {
  const isadmin = false;
  const { name, email, address } = req.body;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  pool.query(queries.checkEmail, [email], (err, results) => {
    if (results.rows.length) {
      res.send("Email already exists");
    } else {
      pool.query(
        queries.addUser,
        [name, email, hashedPassword, address, isadmin],
        (err, results) => {
          if (err) throw err;
          res.status(201).send("User added successfully");
        }
      );
    }
  });
};

//queries database to check if user exists, and compare password. If user exists and password is correct, creates a session for the user
const getUser = (req, res) => {
  const { email, password } = req.body;
  pool.query(queries.selectUser, [email], async (err, results) => {
    if (err) throw err;
    if (results.rows.length) {
      const passwordCompare = await bcrypt.compare(
        req.body.password,
        results.rows[0].password
      );
      if (passwordCompare) {
        req.session.user = { results };
        res.status(200).json(results.rows);
      } else {
        res.status(400).json("wrong username/password");
      }
    } else {
      res.status(400).json("wrong username/password");
    }
  });
};

//checks if user is logged in by checking if session exists, and if logged in, returns user information
const userLoggedIn = (req, res) => {
  if (req.session.user) {
    res.send({
      loggedIn: true,
      user: req.session.user.results.rows[0].name,
      email: req.session.user.results.rows[0].email,
      address: req.session.user.results.rows[0].address,
      isadmin: req.session.user.results.rows[0].isadmin,
    });
  } else {
    res.send({ loggedIn: false });
  }
};

//logs out the user by clearing the session. if the user is logged in
const userLogOut = (req, res) => {
  if (req.session.user) {
    req.session.destroy();
  } else {
    res.send({ loggedIn: false });
  }
};

module.exports = {
  getProducts,
  getOneProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  addReview,
  addUser,
  getUser,
  userLoggedIn,
  userLogOut,
};
