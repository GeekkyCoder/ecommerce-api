const Order = require("../../model/Order");
const Orders = require("../../model/Order");
const Product = require("../../model/Product");

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
};
