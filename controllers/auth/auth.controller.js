const User = require("../../model/User");
const { StatusCodes } = require("http-status-codes");
const { attachCookiesToResponse } = require("../../utils/utils");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const userFound = await User.findOne({ email });

  if (userFound) {
    res.status(400).json({ msg: "email already exist" });
  }

  // setting first user as admin
  const isFirstAccount = (await User.countDocuments({})) === 0;

  const role = isFirstAccount ? "admin" : "user";

  const user = await User.create({ name, email, password, role });

  const tokenUser = { name: user.name, userId: user._id, role: user.role };

  attachCookiesToResponse(res, tokenUser);
};

const login = async (req, res) => {
  res.send("login user");
};

const logout = async (req, res) => {
  res.send("logout user");
};

module.exports = {
  register,
  login,
  logout,
};
