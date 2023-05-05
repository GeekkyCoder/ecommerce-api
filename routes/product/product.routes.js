const {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} = require("../../controllers/product/product.controller");
const authMiddleware = require("../../middleware/authentication");
const authorize = require("../../middleware/authorize");

const productRouter = require("express").Router();

productRouter.get("/", authMiddleware, getAllProducts);
productRouter.post("/", [authMiddleware, authorize("admin")], createProduct);
productRouter.post(
  "/uploadImage",
  [authMiddleware, authorize("admin")],
  uploadImage
);
productRouter.patch(
  "/:id",
  [authMiddleware, authorize("admin")],
  updateProduct
);
productRouter.get("/:id", authMiddleware, getSingleProduct);
productRouter.delete(
  "/:id",
  [authMiddleware, authorize("admin")],
  deleteProduct
);

module.exports = productRouter;
