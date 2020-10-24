const { body } = require("express-validator");
const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const { protect } = require("../middleware/auth");

router.post(
  "/",
  [
    body("username")
      .not()
      .isEmpty()
      .withMessage("Please Enter Name")
      .isLength({ min: 3 })
      .withMessage("Name Must be 3 chars long")
      .trim(),
    body("email")
      .isEmail()
      .withMessage("Please Enter Valid Email ID")
      .normalizeEmail(),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password Must be 8 chars long"),

    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password Doesn't Match");
      }
      return true;
    }),
  ],

  userController.registerUser
);

router.put(
  "/edit-profile/:id",
  protect,
  [
    body("username")
      .not()
      .isEmpty()
      .withMessage("Please Enter Name")
      .isLength({ min: 3 })
      .withMessage("Name Must be 3 chars long")
      .trim(),
    body("email")
      .isEmail()
      .withMessage("Please Enter Valid Email ID")
      .normalizeEmail(),
  ],
  userController.editProfile
);

module.exports = router;
