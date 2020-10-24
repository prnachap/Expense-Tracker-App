const User = require("../models/User");
const Expenses = require("../models/Expense");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const { validationResult } = require("express-validator");
const config = require("config");
const bcryptjs = require("bcryptjs");
const sgMail = require("@sendgrid/mail");
const crypto = require("crypto");
const SENDGRID_API_KEY = config.get("SENDGRID_API_KEY");

// @description  Login User
// @route        POST/api/v1/auth
// @access       public

exports.login = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map((error) => error.msg);
    return next(new ErrorResponse(messages, 404));
  }

  //   check if user exists
  let user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse("Invalid Credentials", 400));
  }

  //   check for password match
  const match = await user.matchPassword(req.body.password);

  if (!match) {
    return next(new ErrorResponse("Invalid Credentials", 400));
  }
  //   generating jwt token
  const token = await user.jwtToken();

  res.status(200).json({ token });
});

// @description Get Current User
// @route       Get/api/v1/auth/
// access       Private

exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ _id: req.user }).select("-password");

  if (!user) {
    return next(new ErrorResponse("Invalid Credentials"));
  }

  res.status(200).json({ user });
});

// @description forgotten password
// @route       Post/api/v1/auth/forgot-password
// access       Private
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const message = errors.array().map((error) => error.msg);
    return next(new ErrorResponse(message, 400));
  }

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse("No User Found", 404));
  }

  // get reset token
  const resetToken = await user.getResetToken();
  await user.save({ validateBeforeSave: false });

  // create reset url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/resetpassword/${resetToken}`;

  // sending email to user for reset link
  sgMail.setApiKey(SENDGRID_API_KEY);

  const msg = {
    to: req.body.email,
    from: "nachappr@gmail.com",
    subject: "eXpense Tracker - Password Reset",
    html: `
            <p>You requested a password reset</p>
            <p>Click this <a href="http://localhost:3000/reset/${resetToken}">link</a> to set a new password.</p>
          `,
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ data: "email sent" });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    return next(new ErrorResponse("email could not be sent", 500));
  }
});

// @description Reset Password
// @route       POST/api/v1/auth/reset-password/:token
// @access      public

exports.resetPassword = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const message = errors.array().map((error) => error.msg);
    return next(new ErrorResponse(message, 400));
  }

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorResponse("Invalid Token", 404));
  }

  // set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(200).json({ message: "password changed" });
});

// @description Logout User
// @route       Get/api/v1/auth/logout
// access       Private

exports.logout = asyncHandler(async (req, res, next) => {
  res.status(200).json({ token: null });
});

// @description Delete Account and associated expenses
// @route       DELETE/api/v1/auth/
// @access      Private
exports.deleteAccount = asyncHandler(async (req, res, next) => {
  // delete user
  await User.findOneAndRemove({ _id: req.user });
  // delete expenses
  await Expenses.deleteMany({ user: req.user });
  res.status(200).json({ data: "user deleted" });
});
