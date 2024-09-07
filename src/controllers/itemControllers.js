// const connection = require('../config/database');
const { getAllItems, createItem, updateItem, getItemById, deleteItembyId } = require('../model/crud');

const getHomePage = (req, res) => {
    return res.render('home');
}

const getAllItemsPage = async (req, res) => {
    rs = await getAllItems();
    let fields = [];
    rs.fields.forEach(element => {
        fields.push(element.name);
    });
    return res.render('view', { listItems: { rows: rs.rows, fields: fields } });
}

const createItemPage = async (req, res) => {
    return res.render('create');
}
const createItemAPI = async (req, res) => {
    const { item_name } = (req.body !== undefined) ? req.body : req.query;
    console.log(req.body);
    await createItem(item_name);
    res.redirect('/item');
}
const updateItemPage = async (req, res) => {
    const { id } = req.params;
    const record = await getItemById(id);
    const name = record[ 0 ].itemName;
    res.render('update', { id: id, name: name });
}
const updateItemAPI = async (req, res) => {
    const { item_name } = (req.body !== undefined) ? req.body : req.query;
    const { id } = (req.body !== undefined) ? req.body : req.params;
    console.log(id, item_name);
    await updateItem(id, item_name);
    res.redirect('/item');
}
const deleteItemPage = async (req, res) => {
    const { id } = req.params;
    await deleteItembyId(id);
    res.redirect('/item');
}
const deleteItemAPI = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    await deleteItembyId(id);
    res.redirect('/item');
}
module.exports = {
    getHomePage,
    getAllItemsPage,
    createItemPage,
    createItemAPI,
    updateItemPage,
    updateItemAPI,
    deleteItemPage,
    deleteItemAPI
}