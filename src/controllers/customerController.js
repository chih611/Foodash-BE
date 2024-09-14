// const connection = require('../config/database');
const { getAllCustomers, createCustomer, updateCustomer, deleteCustomerById } = require('../services/customerService');
const { handleGetAllAPI,
    handleCreateAPI,
    handleUpdateAPI,
    handleDeleteAPI
} = require('../models/handlingModel');

const getAllCustomersAPI = async (req, res) => {
    const { rows } = await getAllCustomers();
    await handleGetAllAPI(res, rows);
}

const createCustomerAPI = async (req, res) => {
    const { customer_name } = req.query;
    await createCustomer(customer_name);
    await handleCreateAPI(res);
}

const updateCustomerAPI = async (req, res) => {
    const { id } = req.params;
    const { customer_name } = req.query;
    await updateCustomer(customer_name, id);
    await handleUpdateAPI(res);
}

const deleteCustomerAPI = async (req, res) => {
    const { id } = req.params;
    await deleteCustomerById(id);
    await handleDeleteAPI(res, id);
}

module.exports = {
    getAllCustomersAPI,
    createCustomerAPI,
    updateCustomerAPI,
    deleteCustomerAPI
}