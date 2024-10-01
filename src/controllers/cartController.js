const {
  getAllCarts,
  getCartByCustomerId,
  createCart,
  updateCart,
  deleteCartById,
} = require("../services/cartService");
const {
  handleGetAllAPI,
  handleCreateAPI,
  handleUpdateAPI,
  handleDeleteAPI,
} = require("../models/handlingModel");

const getAllCartsAPI = async (req, res) => {
  const carts = await getAllCarts();
  await handleGetAllAPI(res, carts);
};

const createCartAPI = async (req, res) => {
  const { customerId, cartItems, cartStatus, cartTotal } = req.body;

  if (!Array.isArray(cartItems) || !customerId || !cartTotal) {
    return res
      .status(400)
      .json({ message: "Invalid input data for cart creation" });
  }

  try {
    await createCart({
      customerId,
      cartItems,
      cartStatus: cartStatus || "pending",
      cartTotal,
    });
    await handleCreateAPI(res);
  } catch (error) {
    console.error("Error creating cart:", error);
    res.status(500).json({ message: "Failed to create cart" });
  }
};

const getCartByCustomerIdAPI = async (req, res) => {
  const { customerId } = req.params;
  try {
    const cart = await getCartByCustomerId(customerId);
    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    console.error("Error retrieving cart by customer ID:", error);
    res.status(500).json({ message: "Failed to retrieve cart" });
  }
};

const updateCartAPI = async (req, res) => {
  const { id } = req.params;
  const { customerId, cartItems, cartStatus, cartTotal } = req.body;

  if (!Array.isArray(cartItems) || !customerId || !cartTotal) {
    return res
      .status(400)
      .json({ message: "Invalid input data for cart update" });
  }

  try {
    await updateCart({
      cartId: id,
      customerId,
      cartItems,
      cartStatus: cartStatus || "pending",
      cartTotal,
    });
    await handleUpdateAPI(res);
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ message: "Failed to update cart" });
  }
};

const deleteCartAPI = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteCartById(id);
    await handleDeleteAPI(res, id);
  } catch (error) {
    console.error("Error deleting cart:", error);
    res.status(500).json({ message: "Failed to delete cart" });
  }
};

module.exports = {
  getAllCartsAPI,
  getCartByCustomerIdAPI,
  createCartAPI,
  updateCartAPI,
  deleteCartAPI,
};
