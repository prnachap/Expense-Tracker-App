// external packages
const express = require("express");
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");
const path = require("path");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const hpp = require("hpp");
// const dotenv = require("dotenv");

// internal packages
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const expenseRouter = require("./routes/expense");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");

// // load env variables
// dotenv.config({ path: "./config.env" });

// connect to database
connectDB();

// PORT
const PORT = process.env.PORT || 5000;

// creating instance of express APP
const app = express();

// body-parser
app.use(bodyParser.json());

// file uploading
app.use(fileupload());

// mongo sanitize
app.use(mongoSanitize());

// set security headers
app.use(helmet());

// prevent xss
app.use(xss());

// enable cors
app.use(cors());

// ratelimiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
});

app.use(limiter);

// prevent http param pollution
app.use(hpp());

// routes
app.use("/api/v1/expenses", expenseRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.get("/", (req, res, next) => {
  res.send();
});

// serve static assets in production
if (process.env.NODE_ENV === "production") {
  // serve files
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// error handler
app.use(errorHandler);

// server
const server = app.listen(PORT, () => {
  console.log(`Server started in PORT: ${PORT}`);
});

// handle unhandle promise
process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.message}`);

  //   close server
  server.close(() => process.exit(1));
});
