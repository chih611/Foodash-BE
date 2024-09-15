// const connection = require('../config/database');
const { getAllCarts,
    createCart,
    updateCart,
    deleteCartById } = require('../services/cartService');
const { handleGetAllAPI,
    handleCreateAPI,
    handleUpdateAPI,
    handleDeleteAPI
} = require('../models/handlingModel');

const getAllCartsAPI = async (req, res) => {
    const { rows } = await getAllCarts();
    await handleGetAllAPI(res, rows);
}

const createCartAPI = async (req, res) => {
    const { item_id, customer_id } = req.query;
    console.log(item_id, customer_id);
    await createCart(item_id, customer_id);
    await handleCreateAPI(res);
}

const updateCartAPI = async (req, res) => {
    const { id } = req.params;
    const { item_id, customer_id } = req.query;
    await updateCart(item_id, customer_id, id);
    await handleUpdateAPI(res);
}

const deleteCartAPI = async (req, res) => {
    const { id } = req.params;
    await deleteCartById(id);
    await handleDeleteAPI(res, id);
}

module.exports = {
    getAllCartsAPI,
    createCartAPI,
    updateCartAPI,
    deleteCartAPI
}