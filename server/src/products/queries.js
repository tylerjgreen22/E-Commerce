const getProducts =
  "SELECT * FROM products LEFT JOIN (SELECT p_id, COUNT(*), TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY p_id) reviews ON products.product_id = reviews.p_id";
const getOneProduct =
  "SELECT * FROM products LEFT JOIN (SELECT p_id, COUNT(*), TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY p_id) reviews ON products.product_id = reviews.p_id WHERE product_id = $1";
const addProduct =
  "INSERT INTO products(name, image, description, price, category) VALUES ($1, $2, $3, $4, $5)";
const updateProduct =
  "UPDATE products SET name = $1, image = $2, description = $3, price = $4, category = $5 WHERE product_id = $6";
const deleteProduct = "DELETE FROM products WHERE product_id = $1";
const getProductReviews = "SELECT * FROM reviews WHERE p_id = $1";
const addReview =
  "INSERT INTO reviews (name, review, rating, p_id) values ($1, $2, $3, $4)";
const addUser =
  "INSERT INTO users (name, email, password, address, isadmin) values ($1, $2, $3, $4, $5)";
const selectUser = "SELECT * FROM  users WHERE email = $1";
const checkEmail = "SELECT * FROM USERS WHERE email = $1";

module.exports = {
  getProducts,
  getOneProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductReviews,
  addReview,
  addUser,
  selectUser,
  checkEmail,
};
