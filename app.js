const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
require("dotenv").config();



const connectDB = require("./db/connect");
const notFoundMiddleware = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error-handler")

const userRouter = require("./routes/user/user.route")

require("express-async-errors")

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

// middlewares
app.use(morgan('combined'))
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))

app.use('/api/v1/auth', userRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

mongoose.connection.on('open', () => {
    console.log('successfully connected to mongodb')
})

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

startServer()