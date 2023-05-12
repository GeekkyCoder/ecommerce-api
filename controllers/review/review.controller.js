const Review = require("../../model/Review");
const Product = require("../../model/Product");

const getAllReviews = (req, res) => {
  res.send("all reviews");
};

const createAReview = async (req, res) => {
  const { product: productId } = req.body;

  req.body.user = req.user.userId;

  const isValidProduct = await Product.findOne({ _id: productId });

  if (!isValidProduct) {
    return res.status(400).json({ msg: "invalid product" });
  }

  const alreadySubmitted = await Review.findOne({
    product: productId,
    user: req.user.userId,
  });

  if (alreadySubmitted) {
    return res.status(400).json({ msg: "you can only review once" });
  }

  const review = await Review.create(req.body);

  res.status(201).json({ review });
};

const getSingleReview = (req, res) => {
  res.send("get single review");
};

const updateReview = (req, res) => {
  res.send("update a review");
};

const deleteReview = (req, res) => {
  res.send("delete review");
};

module.exports = {
  createAReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
