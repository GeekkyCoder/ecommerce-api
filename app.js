const express = require("express");
require("dotenv").config();

const connectDB = require("./db/connect");
const mongoose = require("mongoose");
const notFoundMiddleware = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error-handler")

require("express-async-errors")

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

// middlewares
app.use(express.json())

app.get("/", (req, res) => {
  res.send("hello world");
});


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