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
  res.status(200).json({ user: req.user });
};

const updateUser = async (req, res) => {
  res.send("update user");
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ msg: "please fill all the fields" });
  }

  const user = await User.findOne({ _id: req.user.userId });

  const isMatch = await user.comaparePasswords(oldPassword);

  if (!isMatch) {
    return res.status(401).json({ msg: "Invalid Credentials" });
  }

  user.password = newPassword;

  await user.save();

  res.status(200).json({ msg: "sucess! password updated" });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  
  const user = await User.deleteOne({ _id: id });

  if (!user) {
    return res.statu(200).json({ msg: "user not found" });
  }

  res.status(200).json({ msg: "user removed successfully" });

  res.send({ id });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
  deleteUser,
};
