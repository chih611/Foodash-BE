// customerService.js
const connection = require("../config/database");

// Get all customers
const getAllCustomers = async () => {
  const [rows] = await connection.query("SELECT * FROM CUSTOMER");
  return rows;
};

// Create a new customer
const createCustomer = async ({
  firstName,
  lastName,
  email,
  phoneNumber,
  address,
  customerType,
  password,
  dob,
  gender,
}) => {
  const sql = `
      INSERT INTO CUSTOMER 
      (FIRST_NAME, LAST_NAME, EMAIL, PHONE_NUMBER, ADDRESS, CUSTOMER_TYPE, PASSWORD, DATE_OF_BIRTH, GENDER) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
  const values = [
    firstName,
    lastName,
    email,
    phoneNumber,
    address,
    customerType,
    password,
    dob,
    gender,
  ];

  await connection.query(sql, values);
};

// Update customer details (handles both general updates and guest-to-user upgrades)
const updateCustomer = async ({
  customerId,
  firstName,
  lastName,
  email,
  phoneNumber,
  address,
  password,
  customerType,
  dob,
  gender,
}) => {
  const sql = `
    UPDATE CUSTOMER 
    SET 
      FIRST_NAME = ?, 
      LAST_NAME = ?, 
      EMAIL = ?, 
      PHONE_NUMBER = ?, 
      ADDRESS = ?, 
      PASSWORD = ?, 
      DATE_OF_BIRTH = ?, 
      GENDER = ?, 
      CUSTOMER_TYPE = ?
    WHERE CUSTOMER_ID = ?;
  `;
  const values = [
    firstName,
    lastName,
    email,
    phoneNumber,
    address,
    password || null,
    dob,
    gender,
    customerType || "guest",
    customerId,
  ];

  await connection.query(sql, values);
};

// Delete a customer by ID
const deleteCustomerById = async (customerId) => {
  await connection.query(`DELETE FROM CUSTOMER WHERE CUSTOMER_ID=?;`, [
    customerId,
  ]);
};

// Find customer by email
const findCustomerByEmail = async (email) => {
  const [rows] = await connection.query(
    "SELECT * FROM CUSTOMER WHERE EMAIL = ?",
    [email]
  );
  return rows.length > 0 ? rows[0] : null;
};

// Find customer by phone number
const findCustomerByContact = async (phoneNumber) => {
  const [rows] = await connection.query(
    "SELECT * FROM CUSTOMER WHERE PHONE_NUMBER = ?",
    [phoneNumber]
  );
  return rows.length > 0 ? rows[0] : null;
};

// Validate customer sign-in
const validateCustomerSignIn = async (email, password) => {
  const [rows] = await connection.query(
    "SELECT * FROM CUSTOMER WHERE EMAIL = ? AND PASSWORD = ?",
    [email, password]
  );
  return rows.length > 0 ? rows[0] : null;
};

module.exports = {
  getAllCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomerById,
  findCustomerByEmail,
  findCustomerByContact,
  validateCustomerSignIn,
};
