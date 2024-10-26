const { Client, Environment, ApiError } = require("square");
const { randomUUID } = require("crypto");
require("dotenv").config();

const { paymentsApi } = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Production,
});

const createPaymentAPI = async (req, res) => {
  try {
    const { sourceId } = req.body;
    const { result } = await paymentsApi.createPayment({
      idempotencyKey: randomUUID(),
      sourceId,
      amountMoney: {
        currency: "AUD",
        amount: 1,
      },
    });
    res.status(200).json(result.status);
    // res.status(200).send(JSON.stringify(result));
    // console.log(result);
  } catch (error) {
    if (error instanceof ApiError) {
      error.result.errors.forEach(function (e) {
        console.log(e);
      });
    } else {
      console.log("Unexpected error occurred: ", error);
    }
  }
};

module.exports = {
  createPaymentAPI,
};
