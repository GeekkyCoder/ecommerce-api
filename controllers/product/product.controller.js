const Product = require("../../model/Product");
const path = require("path");

const getAllProducts = async (req, res) => {
  const products = await Product.find({});

  res.status(200).json({ products });
};

const getSingleProduct = async (req, res) => {
  const { id: _id } = req.params;

  // .populate('reviews') -> mongoose virtuals
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
  // console.log(req.files)

  if (!req.files) {
    return res.status(400).json({ msg: "No files uploaded" });
  }

  // console.log(req.files.image)

  const productImage = req.files.image;

  if (!productImage.mimetype.startsWith("image")) {
    return res.status(400).json({ msg: "plese provide image file" });
  }

  //1mb
  const maxSize = 1024 * 1024;

  if (productImage.size > maxSize) {
    return res
      .status(400)
      .json({ msg: "please upload image smaller than 1mb" });
  }

  const imagePath = path.join(
    __dirname,
    `../../public/uploads/${productImage.name}`
  );

  await productImage.mv(imagePath);

  res.status(200).json({ image: `/uploads/${productImage.name}` });
};

const deleteProduct = async (req, res) => {
  const { id: _id } = req.params;

  const productExist = await Product.findOne({ _id });

  if (!productExist) {
    return res
      .status(400)
      .json({ msg: `product with id: ${_id} does not exist` });
  }

  await Product.deleteOne({_id});

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
