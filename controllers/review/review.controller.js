const Review = require("../../model/Review");
const Product = require("../../model/Product");
const { checkPermissions } = require("../../utils/utils");

const getAllReviews = async (req, res) => {
  const reviews = await Review.find({});

  res.status(200).json({ reviews, count:reviews.length });
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

const getSingleReview = async (req, res) => {
  const { id: reviewId } = req.params;

  const review = await Review.findOne({ product: reviewId });

  if (!review) {
    return res.status(400).json({ msg: "no review for this product" });
  }

  res.status(200).json({ review });
};

const updateReview = (req, res) => {};

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
