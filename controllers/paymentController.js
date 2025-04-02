
const { ApiError } = require("../utils/errorHandler");
const paymentService = require("../services/paymentService");

/**
 * Controller for creating a new payment
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createPayment = async (req, res, next) => {
  try {
    const { amount } = req.body;

    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      throw new ApiError("A valid amount is required", 400);
    }

    const response = await paymentService.createPayment(parseFloat(amount));
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller for checking payment status
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const checkPaymentStatus = async (req, res, next) => {
  try {
    const { address } = req.params;

    if (!address) {
      throw new ApiError("A payment address is required", 400);
    }
    const status = await paymentService.checkPaymentStatus(
      address,
    );
    res.status(200).json(status);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPayment,
  checkPaymentStatus,
};
