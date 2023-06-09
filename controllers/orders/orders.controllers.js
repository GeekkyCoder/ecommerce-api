const Order = require("../../model/Order");
const Orders = require("../../model/Order");
const Product = require("../../model/Product");
const { checkPermissions } = require("../../utils/utils");

const fakeStripeApi = async ({ amount, currency }) => {
  const clientSecret = "someRandomText";
  return { clientSecret, amount };
};

const createOrder = async (req, res) => {
  const { items: cartItems, tax, shippingFee } = req.body;

  if (!cartItems || cartItems.length < 1) {
    return res.status(400).json({ msg: "no ordered items" });
  }

  if (!shippingFee || !tax) {
    return res.status(400).json({ msg: "shippingFee and Tax not provided" });
  }

  let orderItems = [];
  let subTotal = 0;

  for (const item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.product });

    if (!dbProduct) {
      return res
        .status(400)
        .json({ msg: `product with id ${item.product} does not exist` });
    }

    const { name, image, price, _id } = dbProduct;

    const orderItem = {
      name,
      image,
      price,
      amount: item.amount,
      product: _id,
    };

    orderItems = [...ordertems, orderItem];
    subTotal += item.amount * price;
  }

  const total = subTotal + tax + shippingFee;

  //fake stripe api
  const paymentIntent = await fakeStripeApi({
    amount: total,
    currency: "usd",
  });

  const order = await Order.create({
    orderItems,
    tax,
    shippingFee,
    subtotal,
    total,
    user: req.user.userId,
    clientSecret: paymentIntent.clientSecret,
  });

  res.status(201).json({ order, clientSecret: order.clientSecret });
};

const getAllOrders = async (req, res) => {
  const orders = await Orders.find({});
  res.status(200).json({ orders, count: orders.length });
};

const getSingleOrder = async (req, res) => {
  const { id: _id } = req.params;

  const order = await Order.findOne({ _id });

  if (!order) {
    return res.status(404).json({ msg: `no order with id ${_id}` });
  }

  const hasPermissions = checkPermissions(req.user, order.user);

  if (!hasPermissions) {
    return res
      .status(403)
      .json({ msg: "not authorized to access this resource" });
  }

  res.status(200).json({ order });
};

const getCurrentUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.userId });
  res.status(200).json({ orders, count: orders.length });
};

const showCurrentUser = (req,res) => {
  return res.status(200).json({user:req.user})
}

const updateOrder = async (req, res) => {
  const { id: _id } = req.params;
  const { paymentIntentId } = req.body;

  const order = await Order.findOne({ _id });

  if (!order) {
    return res.status(404).json({ msg: `no order with id ${_id}` });
  }

  const hasPermissions = checkPermissions(req.user, order.user);

  if (!hasPermissions) {
    return res.status(403).json({ msg: "not authorized" });
  }

  order.paymentIntentId = paymentIntentId;
  order.status = "paid";
  await Order.save();

  res.status(200).json({ order });
};

const deleteOrder = (req, res) => {
  res.send("delete order");
};

module.exports = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  updateOrder,
  deleteOrder,
  showCurrentUser
};
