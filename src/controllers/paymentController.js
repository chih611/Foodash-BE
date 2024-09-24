const {
  getAllInventories,
  createInventory,
  updateInventory,
  deleteInventorybyId,
} = require("../services/inventoryService");

const {
  handleGetAllAPI,
  handleCreateAPI,
  handleUpdateAPI,
  handleDeleteAPI,
} = require("../models/handlingModel");
const { Client } = require("square");
const { randomUUID } = require("crypto");

const { paymentsApi } = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: "sandbox",
});

const createPaymentAPI = async (req, res) => {
  try {
    const { sourceId } = req.body;
    console.log("sourceId", sourceId);
    const { result } = await paymentsApi.createPayment({
      idempotencyKey: randomUUID(),
      sourceId,
      amountMoney: {
        currency: "AUD",
        amount: 100,
      },
    });

    // res.status(200).send(JSON.stringify(result));
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createPaymentAPI,
};
