const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const config = require("config");

const JWT_TOKEN = config.get("JWT_SECRET");

exports.protect = asyncHandler(async (req, res, next) => {
  let token = req.header("x-auth-token");

  if (!token) {
    return next(new ErrorResponse("Not Authorized", 401));
  }

  try {
    const decode = jwt.verify(token, JWT_TOKEN);
    req.user = decode.id;
    next();
  } catch (error) {
    return next(new ErrorResponse("Invalid Token", 401));
  }
});
