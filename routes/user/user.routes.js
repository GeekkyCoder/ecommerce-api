const { getAllUsers, getSingleUser, updateUser, updateUserPassword, showCurrentUser } = require("../../controllers/user/user.controller")

const userRouter = require("express").Router()

userRouter.get("/", getAllUsers)
userRouter.get("/showMe", showCurrentUser)
userRouter.patch("/updateUser", updateUser)
userRouter.patch("/updateUserPassword",updateUserPassword)
userRouter.get("/:id",getSingleUser)

module.exports = userRouter