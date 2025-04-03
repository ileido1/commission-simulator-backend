const axios = require("axios");
const config = require("../config/config");
const { ApiError } = require("../utils/errorHandler");

/**
 * Creates a payment in the payment gateway
 * @param {number} amount - Amount to be paid
 * @returns {Promise<Object>} - Payment data
 */
const createPayment = async (amount) => {
  try {
    const response = await axios.post(
      `${config.PAYMENT_API.BASE_URL}${config.PAYMENT_API.ENDPOINTS.CREATE_PAYMENT}`,
      {
        network: config.PAYMENT_API.DEFAULT_NETWORK,
        fundsGoal: amount,
        smartContractAddress: config.PAYMENT_API.DEFAULT_CONTRACT,
      },
      {
        headers: {
          "client-api-key": config.PAYMENT_API.KEY,
          "content-type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Error to create the payment";
    const statusCode = error.response?.status || 500;

    throw new ApiError(errorMessage, statusCode);
  }
};

/**
 * @param {string} address - Payment address to check
 * @param {number} amount - Expected payment amount
 * @returns {Promise<Object>} - Payment status data
 */
const checkPaymentStatus = async (address, amount) => {
  try {

const response = await axios.get(
  `${config.PAYMENT_API.BASE_URL}${config.PAYMENT_API.ENDPOINTS.CHECK_PAYMENT}`,
  {
    params: {
      network: config.PAYMENT_API.DEFAULT_NETWORK,
      address: address,
    },
    headers: {
      "client-api-key": config.PAYMENT_API.KEY,
      "content-type": "application/json",
    },
  }
);

return response.data;

  } catch (error) {
    console.log(error);
    throw new ApiError("Error to verify the payment", 500);
  }
};

module.exports = {
  createPayment,
  checkPaymentStatus,
};
