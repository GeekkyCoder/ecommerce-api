const {
  getAllOrders,
  getSingleOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  getCurrentUserOrders,
} = require("../../controllers/orders/orders.controllers");
const authMiddleware = require("../../middleware/authentication");
const authorize = require("../../middleware/authorize");

const orderRouter = require("express").Router();

orderRouter.get("/", authMiddleware, authorize("admin", "owner"), getAllOrders);
orderRouter.post("/", authMiddleware, createOrder);
orderRouter.get("/currentUser", authMiddleware, getCurrentUserOrders);
orderRouter.get("/:id", authMiddleware, getSingleOrder);
orderRouter.patch("/:id", authMiddleware, updateOrder);
orderRouter.delete("/:id", authMiddleware, deleteOrder);

module.exports = orderRouter;
