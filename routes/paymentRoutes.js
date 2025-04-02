const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const { asyncHandler } = require("../utils/errorHandler");

/**
 * @route   POST /api/create-payment
 * @desc    Create a new payment
 * @access  Public
 */
router.post("/create-payment", asyncHandler(paymentController.createPayment));

/**
 * @route   GET /api/check-payment/:address
 * @desc    Check payment status
 * @access  Public
 */
router.get(
  "/check-payment/:address",
  asyncHandler(paymentController.checkPaymentStatus)
);

module.exports = router;
