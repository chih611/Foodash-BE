// customerService.js
const connection = require("../config/database");

// Get all customers
const getAllCustomers = async () => {
  const [rows] = await connection.query("SELECT * FROM CUSTOMER");
  return rows;
};

const findCustomerById = async (customerId) => {
  const [rows] = await connection.query(
    "SELECT * FROM CUSTOMER WHERE CUSTOMER_ID = ?",
    [customerId]
  );
  return rows.length > 0 ? rows[0] : null;
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
  abn,
  dietaryPreference,
  loyaltyPoints = 0, // Default to 0 if not provided
  favourites,
  postcode,
  state,
  city,
}) => {
  const sql = `
      INSERT INTO CUSTOMER 
      (FIRST_NAME, LAST_NAME, EMAIL, PHONE_NUMBER, ADDRESS, CUSTOMER_TYPE, PASSWORD, DATE_OF_BIRTH, GENDER, ABN, DIETARY_PREFERENCE, LOYALTY_POINTS, FAVOURITES, POSTCODE, STATE, CITY) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
    abn,
    dietaryPreference,
    loyaltyPoints,
    JSON.stringify(favourites), // Convert JSON data to string
    postcode,
    state,
    city,
  ];

  // Insert customer and return the new customer ID
  const [result] = await connection.query(sql, values);
  return result.insertId; // Return the new customer ID after insertion
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
  abn,
  dietaryPreference,
  loyaltyPoints,
  favourites,
  postcode,
  state,
  city,
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
      CUSTOMER_TYPE = ?,
      ABN = ?,
      DIETARY_PREFERENCE = ?,
      LOYALTY_POINTS = ?,
      FAVOURITES = ?,
      POSTCODE = ?,
      STATE = ?,
      CITY = ?
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
    abn,
    dietaryPreference,
    loyaltyPoints,
    JSON.stringify(favourites),
    postcode,
    state,
    city,
    customerId,
  ];

  try {
    const [result] = await connection.query(sql, values);
    if (result.affectedRows === 0) {
      throw new Error(
        "No rows were updated. Please check the customer ID or input data."
      );
    }
  } catch (error) {
    console.error("Update failed:", error.message);
    throw error;
  }
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
  findCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomerById,
  findCustomerByEmail,
  findCustomerByContact,
  validateCustomerSignIn,
};
