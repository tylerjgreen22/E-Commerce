const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/", controller.getProducts);
router.get("/login", controller.userLoggedIn);
router.get("/logout", controller.userLogOut);
router.get("/:id", controller.getOneProduct);
router.post("/", controller.addProduct);
router.put("/:id", controller.updateProduct);
router.delete("/:id", controller.deleteProduct);
router.post("/login", controller.getUser);
router.post("/register", controller.addUser);
router.post("/:id", controller.addReview);

module.exports = router;
