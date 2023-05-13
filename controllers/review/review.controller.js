const Review = require("../../model/Review");
const Product = require("../../model/Product");
const { checkPermissions } = require("../../utils/utils");

const getAllReviews = async (req, res) => {
  const reviews = await Review.find({}).populate({path:'product',select:'name company price'}).populate({path:'user',select:'name'});

  res.status(200).json({ reviews, count: reviews.length });
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

  //   const hasPermissions = checkPermissions(req.user, review.user);

  //   if (!hasPermissions) {
  //     return res
  //       .status(403)
  //       .json({ msg: "you are not authorized to access this resource" });
  //   }

  res.status(200).json({ review });
};

const updateReview = async (req, res) => {
  const { id: reviewId } = req.params;

  const reviewExist = await Review.findOne({ _id: reviewId });

  const hasPersmissions = checkPermissions(req.user, reviewExist.user);

  if (!hasPersmissions) {
    return res
      .status(403)
      .json({ msg: "not authorized to access this resource" });
  }

  const review = await Review.findOneAndUpdate({ _id: reviewId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!review) {
    return res.status(400).json({ msg: `no review with ${reviewId} found` });
  }

  res.status(200).json({ review });
};



const deleteReview = async (req, res) => {
  const { id: reviewId } = req.params;

  const reviewExist = await Review.findOne({ _id: reviewId });

  if (!reviewExist) {
    return res
      .status(400)
      .json({ msg: `review with id: ${reviewId} does not exist` });
  }

  const hasPermissions = checkPermissions(req.user, reviewExist.user);

  if (!hasPermissions) {
    return res
      .status(403)
      .json({ msg: "you are not authorized to access this resource" });
  }

  await Review.deleteOne({ _id: reviewId });

  res.status(200).json({ msg: "success! review deleted" });
};

module.exports = {
  createAReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
