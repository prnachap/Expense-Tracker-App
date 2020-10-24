const { body } = require("express-validator");
const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");
const { protect } = require("../middleware/auth");

router.post(
  "/",
  [
    body("email")
      .isEmail()
      .withMessage("Please Enter Valid Email ID")
      .normalizeEmail(),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password Must be 8 chars long"),
  ],
  authController.login
);

router.post(
  "/forgot-password",
  [
    body("email")
      .isEmail()
      .withMessage("Please Enter Valid Email ID")
      .normalizeEmail(),
  ],
  authController.forgotPassword
);

router.post(
  "/reset-password/:token",
  [
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
  authController.resetPassword
);

router.get("/", protect, authController.getMe);
router.get("/logout", protect, authController.logout);
router.delete("/", protect, authController.deleteAccount);

module.exports = router;
