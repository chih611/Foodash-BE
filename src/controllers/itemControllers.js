// const connection = require('../config/database');
const { getAllItems, createItem } = require('../model/crud');

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
const createItemPostPage = async (req, res) => {
    const { item_id, item_name } = req.body;
    await createItem(item_id, item_name);
    res.redirect('/item');
}

module.exports = {
    getHomePage,
    getAllItemsPage,
    createItemPage,
    createItemPostPage
}