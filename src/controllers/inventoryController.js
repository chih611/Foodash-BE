const { getAllInventories,
    createInventory,
    updateInventory,
    deleteInventorybyId
} = require('../services/inventoryService');

const { handleGetAllAPI,
    handleCreateAPI,
    handleUpdateAPI,
    handleDeleteAPI
} = require('../models/handlingModel');

const getAllInventoryAPI = async (req, res) => {
    const { rows } = await getAllInventories();
    await handleGetAllAPI(res, rows);
}

const createInventoryAPI = async (req, res) => {
    const { inventory_name, category, exp_date, stock_status, notes, task_assigment } = req.query;
    await createInventory(inventory_name, category, exp_date, stock_status, notes, task_assigment);
    await handleCreateAPI(res);
}

const updateInventoryAPI = async (req, res) => {
    const { id } = req.params;
    const { inventory_name, category, exp_date, stock_status, notes, task_assigment } = req.query;
    await updateInventory(inventory_name, category, exp_date, stock_status, notes, task_assigment, id);
    await handleUpdateAPI(res);
}

const deleteInventoryAPI = async (req, res) => {
    const { id } = req.params;
    await deleteInventorybyId(id);
    await handleDeleteAPI(res, id);
}

module.exports = {
    getAllInventoryAPI,
    createInventoryAPI,
    updateInventoryAPI,
    deleteInventoryAPI
}