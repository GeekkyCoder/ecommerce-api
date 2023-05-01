const {
  register,
  login,
  logout,
} = require("../../controllers/auth/auth.controller");

const authRouter = require("express").Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/logout", logout);

module.exports = authRouter;
