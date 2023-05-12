const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload")
const path = require('path')
require("express-async-errors");
require("dotenv").config();

const connectDB = require("./db/connect");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const authRouter = require("./routes/auth/auth.routes.js");
const userRouter = require("./routes/user/user.routes.js");
const productRouter = require("./routes/product/product.routes");
const reviewRouter = require("./routes/review/review.routes");

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

// middlewares
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(fileUpload())

app.use(express.static(path.join(__dirname,'./public')))

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/reviews", reviewRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

mongoose.connection.on("open", () => {
  console.log("successfully connected to mongodb");
});

const startServer = async () => {
  try {
    await connectDB(MONGO_URL);
    app.listen(PORT, () => {
      console.log(`server is listening at port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
