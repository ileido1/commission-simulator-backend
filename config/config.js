module.exports = {
  PAYMENT_API: {
    BASE_URL: "https://my.disruptivepayments.io/api",
    ENDPOINTS: {
      CREATE_PAYMENT: "/payments/single",
      CHECK_PAYMENT: "/payments/status",
    },
    KEY: process.env.PAYMENT_API_KEY,
    DEFAULT_NETWORK: "BSC",
    DEFAULT_CONTRACT: "0x7cDb78AD26670D5bc4A35504b0e5127909D4B35b",
  },
  CORS_OPTIONS: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  },
};
