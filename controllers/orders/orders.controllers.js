const Orders = require("../../model/Order");

const createOrder = (req, res) => {
  res.send("create orders");
};

const getAllOrders = async (req, res) => {
  const orders = await Orders.find({});
  res.status(200).json({ orders });
};

const getSingleOrder = (req, res) => {
  res.send("get single order");
};

const getCurrentUserOrders = (req, res) => {
  res.send("get Current User Orders");
};

const updateOrder = (req, res) => {
  res.send("update Order");
};

const deleteOrder = (req,res) => {
  res.send("delete order")
}

module.exports = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  updateOrder,
  deleteOrder
};
