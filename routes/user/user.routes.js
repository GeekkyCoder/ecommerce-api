const { getAllUsers, getSingleUser, updateUser, updateUserPassword, showCurrentUser, deleteUser } = require("../../controllers/user/user.controller")
const authorize = require("../../middleware/authorize")
const authMiddleware = require("../../middleware/authentication")


const userRouter = require("express").Router()

userRouter.get("/", authMiddleware, authorize("admin","owner"),  getAllUsers)
userRouter.delete("/:id", authMiddleware, authorize("admin","owner"), deleteUser)
userRouter.get("/showMe", authMiddleware, showCurrentUser)
userRouter.patch("/updateUser", authMiddleware, updateUser)
userRouter.patch("/updateUserPassword", authMiddleware, updateUserPassword)
userRouter.get("/:id",authMiddleware, authorize("admin","owner"), getSingleUser)

module.exports = userRouter