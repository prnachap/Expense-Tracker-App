const express = require("express");
const router = express.Router();
const expenseController = require("../controller/expense");
const { protect } = require("../middleware/auth");
const { body } = require("express-validator");

router.get("/", protect, expenseController.getExpenses);
router.get("/:id", protect, expenseController.getExpense);
router.post(
  "/",
  protect,
  [
    body("title")
      .not()
      .isEmpty()
      .withMessage("Title cannot be empty")
      .isLength({ min: 3 })
      .withMessage("Title Must be 3 chars long")
      .trim(),
    body("amount")
      .not()
      .isEmpty()
      .withMessage("Amount cannot be empty")
      .matches(/^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/)
      .withMessage("Amount must be greater than zero"),
    body("date", "Date cannot be empty").not().isEmpty(),
  ],
  expenseController.createExpense
);

router.put(
  "/:id",
  protect,
  [
    body("title")
      .not()
      .isEmpty()
      .withMessage("Title cannot be empty")
      .isLength({ min: 3 })
      .withMessage("Title Must be 3 chars long")
      .trim(),
    body("amount")
      .not()
      .isEmpty()
      .withMessage("Amount cannot be empty")
      .matches(/^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/)
      .withMessage("Amount must be greater than zero"),
    body("date", "Date cannot be empty").not().isEmpty(),
  ],
  expenseController.editExpense
);

router.delete("/:id", protect, expenseController.deleteExpense);

module.exports = router;
