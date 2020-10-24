const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  
  let error = { ...err };
  error.message = err.message;
  // cast error
  if (err.name === "CastError") {
    const message = "Invalid ID";
    error = new ErrorResponse(message, 400);
  }

  // mongoose dublicate error
  if (err.code === 11000) {
    const message = "User Already Exists, Please Login if already Registed";
    error = new ErrorResponse(message, 400);
  }

  // mongoose validation error
  if (err.name == "ValidationError") {
    const message = Object.values(err.errors).map((error) => error.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    message: error.message || "Server Error",
  });
};

module.exports = errorHandler;
