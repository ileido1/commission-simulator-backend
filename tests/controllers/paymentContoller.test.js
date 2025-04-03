const paymentController = require("../../controllers/paymentController");
const paymentService = require("../../services/paymentService");
const { ApiError } = require("../../utils/errorHandler");

jest.mock("../../services/paymentService");

describe("Payment Controller", () => {
  let req, res, next;

  beforeEach(() => {
    jest.clearAllMocks();

    req = {
      body: {},
      params: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();
  });

  describe("createPayment", () => {
    test("should create payment successfully", async () => {
      const amount = 100;
      const mockResponse = { address: "0x123", id: "payment_123" };

      req.body.amount = amount;

      paymentService.createPayment.mockResolvedValue(mockResponse);

      await paymentController.createPayment(req, res, next);

      expect(paymentService.createPayment).toHaveBeenCalledWith(amount);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockResponse);

      expect(next).not.toHaveBeenCalled();
    });

    test("should handle missing amount", async () => {
      await paymentController.createPayment(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toBeInstanceOf(ApiError);
      expect(next.mock.calls[0][0].message).toBe("A valid amount is required");
      expect(next.mock.calls[0][0].statusCode).toBe(400);

      expect(paymentService.createPayment).not.toHaveBeenCalled();
    });

    test("should handle invalid amount", async () => {
      req.body.amount = "invalid";
      await paymentController.createPayment(req, res, next);
      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toBeInstanceOf(ApiError);
      expect(paymentService.createPayment).not.toHaveBeenCalled();
    });

    test("should handle negative amount", async () => {
      req.body.amount = -10;

      await paymentController.createPayment(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toBeInstanceOf(ApiError);

      expect(paymentService.createPayment).not.toHaveBeenCalled();
    });

    test("should handle service error", async () => {
      const amount = 100;
      const mockError = new ApiError("Service error", 500);
      req.body.amount = amount;

      paymentService.createPayment.mockRejectedValue(mockError);
      await paymentController.createPayment(req, res, next);

      expect(next).toHaveBeenCalledWith(mockError);

      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe("checkPaymentStatus", () => {
    test("should check payment status successfully", async () => {
      const address = "0x123";
      const mockResponse = { status: "completed", amount: 100 };
      req.params.address = address;
      paymentService.checkPaymentStatus.mockResolvedValue(mockResponse);

      await paymentController.checkPaymentStatus(req, res, next);

      expect(paymentService.checkPaymentStatus).toHaveBeenCalledWith(address);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockResponse);

      expect(next).not.toHaveBeenCalled();
    });

    test("should handle missing address", async () => {
      await paymentController.checkPaymentStatus(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toBeInstanceOf(ApiError);
      expect(next.mock.calls[0][0].message).toBe(
        "A payment address is required"
      );
      expect(next.mock.calls[0][0].statusCode).toBe(400);

      expect(paymentService.checkPaymentStatus).not.toHaveBeenCalled();
    });

    test("should handle service error", async () => {
      const address = "0x123";
      const mockError = new ApiError("Service error", 500);

      req.params.address = address;

      paymentService.checkPaymentStatus.mockRejectedValue(mockError);

      await paymentController.checkPaymentStatus(req, res, next);

      expect(next).toHaveBeenCalledWith(mockError);

      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });
});
