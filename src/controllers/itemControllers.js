// const connection = require('../config/database');
const { getAllItems, createItem, updateItem, getItemById, deleteItembyId } = require('../model/crud');

const getHomePage = (req, res) => {
    return res.render('home');
}

const getAllItemsAPI = async (req, res) => {
    const { rows } = await getAllItems();
    if (rows.length === 0) {
        res.send(`No data found!!!`);
    } else {
        const formattedOutput = rows.map(row => JSON.stringify(row)).join('\n');
        res.setHeader('Content-Type', 'application/json');
        res.send(formattedOutput);
    }
}

const createItemAPI = async (req, res) => {
    const { item_name } = req.query;
    const rs = await createItem(item_name);
    res.status(200).json('Created successfully!');
}

const updateItemAPI = async (req, res) => {
    const { id } = req.params;
    const record = await getItemById(id);
    const { item_name } = req.query;
    const rs = await updateItem(id, item_name);
    res.status(200).json('Updated successfully!');
}

const deleteItemAPI = async (req, res) => {
    const { id } = req.params;
    const rs = await deleteItembyId(id);
    res.status(200).json(`Item ${id} has been deleted successfully!`);
}

module.exports = {
    getHomePage,
    getAllItemsAPI,
    createItemAPI,
    updateItemAPI,
    deleteItemAPI
}