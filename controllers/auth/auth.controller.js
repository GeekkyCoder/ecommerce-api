const User = require("../../model/User");
const { attachCookiesToResponse } = require("../../utils/utils");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json({ msg: "Invalid Credentials" });
  }

  const userFound = await User.findOne({ email });

  if (userFound) {
    return res.status(400).json({ msg: "Email Already Exist" });
  }

  // setting first user as admin
  const isFirstAccount = (await User.countDocuments({})) === 0;

  const role = isFirstAccount ? "admin" : "user";

  const user = await User.create({ name, email, password, role });

  const tokenUser = { name: user.name, userId: user._id, role: user.role };

  attachCookiesToResponse(res, tokenUser);

  res.status(201).json({ user: tokenUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Invalid Credentials" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ msg: "Invalid Credentials" });
  }

  const isPasswordMatch = await user.comaparePasswords(password);

  if (!isPasswordMatch) {
    return res.status(401).json({ msg: "Invalid Credentials" });
  }

  const tokenUser = { name: user.name, userId: user._id, role: user.role };

  attachCookiesToResponse(res, tokenUser);

  // res.status(200).json({ user: tokenUser });
};

const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(200).json('user logged out!')
};

module.exports = {
  register,
  login,
  logout,
};
