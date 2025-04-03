const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const config = require("../../config/config");
const { ApiError } = require("../../utils/errorHandler");
const paymentService = require("../../services/paymentService");

const mockAxios = new MockAdapter(axios);

describe("Payment Service", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  describe("createPayment", () => {
    const amount = 100;
    const mockResponseData = { address: "0x123", id: "payment_123" };
    const expectedUrl = `${config.PAYMENT_API.BASE_URL}${config.PAYMENT_API.ENDPOINTS.CREATE_PAYMENT}`;
    const expectedData = {
      network: config.PAYMENT_API.DEFAULT_NETWORK,
      fundsGoal: amount,
      smartContractAddress: config.PAYMENT_API.DEFAULT_CONTRACT,
    };
    const expectedHeaders = {
      "client-api-key": config.PAYMENT_API.KEY,
      "content-type": "application/json",
    };

    test("should create payment successfully", async () => {
      mockAxios.onPost(expectedUrl).reply(200, mockResponseData);
      const result = await paymentService.createPayment(amount);
      expect(result).toEqual(mockResponseData);
      expect(mockAxios.history.post[0].url).toBe(expectedUrl);
      expect(JSON.parse(mockAxios.history.post[0].data)).toEqual(expectedData);
    });

    test("should throw ApiError when request fails", async () => {
      mockAxios.onPost(expectedUrl).reply(400, { message: "Invalid amount" });
      await expect(paymentService.createPayment(amount)).rejects.toThrow(
        ApiError
      );
    });

    test("should throw ApiError with default message when no error message is provided", async () => {
      mockAxios.onPost(expectedUrl).reply(500);
      await expect(paymentService.createPayment(amount)).rejects.toThrow(
        "Error to create the payment"
      );
    });
  });

  describe("checkPaymentStatus", () => {
    const address = "0x123";
    const amount = 100;
    const mockResponseData = { status: "completed", amount: 100 };
    const expectedUrl = `${config.PAYMENT_API.BASE_URL}${config.PAYMENT_API.ENDPOINTS.CHECK_PAYMENT}`;

    test("should check payment status successfully", async () => {
      mockAxios.onGet(expectedUrl).reply(200, mockResponseData);
      const result = await paymentService.checkPaymentStatus(address, amount);
      expect(result).toEqual(mockResponseData);
    });

    test("should throw ApiError when request fails", async () => {
      mockAxios.onGet(expectedUrl).networkError();
      await expect(
        paymentService.checkPaymentStatus(address, amount)
      ).rejects.toThrow(ApiError);
    });
  });
});
