const Product = require("../../model/Product");

const getAllProducts = async (req, res) => {
  const products = await Product.find({});

  res.status(200).json({ products });
};

const getSingleProduct = async (req, res) => {
  const { id: _id } = req.params;

  const product = await Product.findOne({ _id });

  if (!product) {
    return res
      .status(400)
      .json({ msg: `product with id: ${_id} does not exist ` });
  }

  res.status(200).json({ product });
};

const createProduct = async (req, res) => {
  req.body.user = req.user.userId;

  const product = await Product.create(req.body);

  res.status(201).json({ product });
};

const updateProduct = async (req, res) => {
  const { id: _id } = req.params;

  const product = await Product.findOneAndUpdate({ _id }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return res.status(500).json({ msg: "something went wrong try again!" });
  }

  res.status(200).json({ product });
};

const uploadImage = async (req, res) => {
  res.send("upload image");
};

const deleteProduct = async (req, res) => {
  const { id: _id } = req.params;

  const productExist = await Product.findOne({ _id });

  if (!productExist) {
    return res
      .status(400)
      .json({ msg: `product with id: ${_id} does not exist` });
  }

  await Product.deleteOne({ _id });

  res.status(200).json({ msg: "success! product deleted" });
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  uploadImage,
  deleteProduct,
};
