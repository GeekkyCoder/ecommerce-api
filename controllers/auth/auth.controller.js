const User = require("../../model/User");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  // res.send("register user");
  const user = await User.create(req.body);
  res.status(StatusCodes.OK).json({ user });
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
