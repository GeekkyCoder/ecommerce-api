const mongoose = require("mongoose");

/*
- [] rating : {type:Number}
- [] title: {type:String}
- [] comment: {type:String}
- [] user
- [] product
- [] set timestamps
- [] export Review model
*/

const reviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      maxlen: 100,
      required: [true, "please provde review title"],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "please provide rating"],
    },
    comment: {
      type: String,
      required: [true, "please provide review text"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: "true",
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "product",
      required: "true",
    },
  },
  { timestamps: true }
);

// user one review per product
reviewSchema.index({ user: 1, product: 1 }, { unique: true });

reviewSchema.statics.calculateAvgRating = async function (productId) {
  const result = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$rating" },
        numOfReviews: { $sum: 1 },
      },
    },
  ]);

  console.log(result)

  try {
    await this.model("product").findOneAndUpdate(
      { _id: productId },
      {
        averageRating: result[0]?.averageRating || 0,
        numOfReviews: result[0]?.numOfReviews || 0,
      }
    );
  } catch (err) {
    console.log(err);
  }
};

reviewSchema.post("save", async function () {
  console.log("saved");
  await this.constructor.calculateAvgRating(this.product);
});

reviewSchema.post("deleteOne", async function () {
  await this.constructor.calculateAvgRating(this.product);
});

module.exports = mongoose.model("review", reviewSchema);
