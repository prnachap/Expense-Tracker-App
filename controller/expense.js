const Expense = require("../models/Expense");
const asyncHandler = require("../utils/asyncHandler");
const { validationResult } = require("express-validator");
const ErrorResponse = require("../utils/errorResponse");

// @description Get All Expenses for logged in user
// @route       GET/api/v1/expenses
// @access      Private
exports.getExpenses = asyncHandler(async (req, res, next) => {
  const expense = await Expense.find({ user: req.user });
  res.json({ expense: expense });
});

// @description Get Single Expense
// @route       GET/api/v1/expenses/:id
// @access      Private
exports.getExpense = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  let expense = await Expense.findById(id);

  if (!expense) {
    return next(new ErrorResponse("No Expense Found"), 400);
  }

  res.status(200).json({ expense: expense });
});

// @description Create Expense
// @route       POST /api/v1/expenses
// @access      Private

exports.createExpense = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const message = errors.array().map((error) => error.msg);
    return next(new ErrorResponse(message, 400));
  }

  // adding user to body
  req.body.user = req.user;

  const expense = await Expense.create(req.body);

  res.status(201).json({ expense });
});

// @description Edit Expense
// @route       PUT/api/v1/expenses/:id
// @access      Private
exports.editExpense = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  //   check if item exists
  let expense = await Expense.findById(id);

  if (!expense) {
    return next(new ErrorResponse("No Expense Found", 404));
  }

  // check if only owner who has created it can update
  if (expense.user.toString() !== req.user.toString()) {
    return next(new ErrorResponse("Not Authorized", 401));
  }

  //   update item
  expense = await Expense.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });

  res.status(200).json({ expense });
});

// @description delete Expense
// @route       DELETE/api/v1/expenses/:id
// @access      private
exports.deleteExpense = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  //   check if item exsits
  let expense = await Expense.findById(id);
  if (!expense) {
    return next(new ErrorResponse("No Expense Found", 404));
  }

  // check if user deleting is the one who has created it
  if (req.user.toString() !== expense.user.toString()) {
    return next(new ErrorResponse("Not Authorized", 401));
  }
  //   delete item
  await expense.remove();

  res.status(200).json({ expense });
});
