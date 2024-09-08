// const connection = require('../config/database');
const { getAllItems, createItem, updateItem, deleteItembyId } = require('../services/crud');
const { handleGetAllAPI,
    handleCreateAPI,
    handleUpdateAPI,
    handleDeleteAPI
} = require('../models/itemModel');

const getHomePage = (req, res) => {
    return res.render('home');
}

const getAllItemsAPI = async (req, res) => {
    const { rows } = await getAllItems();
    await handleGetAllAPI(res, rows);
}

const createItemAPI = async (req, res) => {
    const { item_name } = req.query;
    await createItem(item_name);
    await handleCreateAPI(res);

}

const updateItemAPI = async (req, res) => {
    const { id } = req.params;
    const { item_name } = req.query;
    await updateItem(id, item_name);
    await handleUpdateAPI(res);
}

const deleteItemAPI = async (req, res) => {
    const { id } = req.params;
    await deleteItembyId(id);
    await handleDeleteAPI(res);
}

module.exports = {
    getHomePage,
    getAllItemsAPI,
    createItemAPI,
    updateItemAPI,
    deleteItemAPI
}