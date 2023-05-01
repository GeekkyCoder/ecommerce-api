const User = require("../../model/User");

const getAllUsers = async (req, res) => {
  console.log(req.user);
  const users = await User.find({ role: "user" }, { password: 0 });

  if (!users) {
    return res.status(400).json({ msg: "could not fetch users..." });
  }

  res.status(200).json({ users });
};

const getSingleUser = async (req, res) => {
  const { id: _id } = req.params;
  const user = await User.findOne({ _id }, { password: 0 });

  if (!user) {
    return res.status(400).json({ msg: "user not found" });
  }

  res.status(200).json({ user });
};

const showCurrentUser = async (req, res) => {
  res.send("current user");
};

const updateUser = async (req, res) => {
  res.send("update user");
};

const updateUserPassword = async (req, res) => {
  res.send("update user password");
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
