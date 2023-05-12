const reviewRouter = require("express").Router();

const authMiddleware = require("../../middleware/authentication");

const {
  createAReview,
  getAllReviews,
  updateReview,
  deleteReview,
  getSingleReview,
} = require("../../controllers/review/review.controller");

reviewRouter.get("/", getAllReviews);
reviewRouter.post("/", authMiddleware, createAReview);
reviewRouter.get("/:id", getSingleReview);
reviewRouter.patch("/:id", authMiddleware, updateReview);
reviewRouter.delete("/:id", authMiddleware, deleteReview);

module.exports = reviewRouter;
