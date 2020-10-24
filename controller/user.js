const User = require("../models/User");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const { validationResult } = require("express-validator");
const path = require("path");
const config = require("config");

const JWT_SECRET = config.get("JWT_SECRET");
const MAX_FILE_UPLOAD = config.get("MAX_FILE_UPLOAD");
const FILE_UPLOAD_PATH = config.get("FILE_UPLOAD_PATH");

// @description  createUser
// @route        POST/api/v1/users
// @access       public

exports.registerUser = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors.array().map((error) => error.msg);
    return next(new ErrorResponse(message, 400));
  }

  const user = await User.create(req.body);
  //   saving model so that password is saved using mongoose middleware
  await user.save();
  //   generating jwt
  const token = await user.jwtToken();
  res.status(201).json({ token });
});

// @description  Edit User Profile
// @route        PUT/api/v1/users/edit-profile/:id
// @access       public

exports.editProfile = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req.body.data);

  if (!errors.isEmpty()) {
    const message = errors.array().map((error) => error.msg);
    return next(new ErrorResponse(message, 400));
  }
  const { email, username } = JSON.parse(req.body.data);
  let user = await User.findById(req.params.id).select("-password");

  if (!user) {
    return next(new ErrorResponse("Profile Not Found", 404));
  }

  if (!req.files) {
    return next(new ErrorResponse("Please Upload Image", 404));
  }

  // check if file is image
  const file = req.files.image;

  if (!file.mimetype.startsWith("image/")) {
    return next(new ErrorResponse("Please Add Valid Image File", 400));
  }
  if (file.size > MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload and image less than ${MAX_FILE_UPLOAD}bytes `,
        400
      )
    );
  }

  // create file name
  const fileExtension = file.mimetype.split("/")[1].trim();
  file.name = `photo_${user._id}.${fileExtension}`;

  // move file to uploads folder
  file.mv(`${FILE_UPLOAD_PATH}/${file.name}`, async (error) => {
    if (error) {
      return new ErrorResponse("Problem with file upload", 500);
    }

    // updating profile
    user.email = email;
    user.username = username;
    user.photo = file.data;
    user.photoType = file.mimetype;

    await user.save();

    res.status(200).json({ user });
  });
});
