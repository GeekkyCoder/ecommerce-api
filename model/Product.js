const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "please provide product name"],
      maxlength: [100, "product name can not be more than 100 letters"],
    },
    price: {
      type: Number,
      required: [true, "please provide product price"],
      default: 0,
    },
    description: {
      type: String,
      required: [true, "please provide product description"],
      maxlength: [
        1000,
        "product description can not include more than 1000 letters",
      ],
    },
    image: {
      type: String,
      default: "uploads/example.jpeg",
    },
    category: {
      type: String,
      required: [true, "please provide product category"],
      enum: ["office", "kitchen", "bedroom"],
    },
    company: {
      type: String,
      required: [true, "please provide company"],
      enum: {
        values: ["ikea", "liddy", "marcos"],
        message: "{Value} is not supported",
      },
    },
    colors: {
      type: [String],
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    inventory: {
      type: Number,
      required: true,
      default: 15,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: "true",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);
