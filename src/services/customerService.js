const connection = require("../config/database");

// Get all customers
const getAllCustomers = async () => {
  const [rows, fields] = await connection.query("SELECT * FROM CUSTOMER");
  return { rows, fields };
};

// Create a new customer
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
    password, // This will be 'null' for guests
    dob,
    gender,
  ];

  await connection.query(sql, values);
};

// Update existing customer to change from guest to user
// Update existing customer to change from guest to user
const updateGuestToUser = async (
  customerId,
  { firstName, lastName, email, phoneNumber, address, password, dob, gender }
) => {
  const sql = `
      UPDATE CUSTOMER 
      SET FIRST_NAME = ?, 
          LAST_NAME = ?, 
          EMAIL = ?, 
          PHONE_NUMBER = ?, 
          ADDRESS = ?, 
          CUSTOMER_TYPE = 'user', 
          PASSWORD = ?,
          DATE_OF_BIRTH = ?,  -- Include dob in the update
          GENDER = ?          -- Include gender in the update
      WHERE CUSTOMER_ID = ?
    `;

  const values = [
    firstName,
    lastName,
    email,
    phoneNumber,
    address,
    password,
    dob,
    gender,
    customerId,
  ];

  await connection.query(sql, values);
};

// Update customer details
const updateCustomer = async (firstName, lastName, customerId) => {
  await connection.query(
    `UPDATE CUSTOMER
SET FIRST_NAME=?, LAST_NAME=?
WHERE CUSTOMER_ID=?;`,
    [firstName, lastName, customerId]
  );
};

// Delete a customer by ID
const deleteCustomerById = async (customerId) => {
  const [rows, fields] = await connection.query(
    `DELETE FROM CUSTOMER WHERE CUSTOMER_ID=?;`,
    [customerId]
  );
  return rows;
};

// Find customer by email (for 'user' type)
const findCustomerByEmail = async (email) => {
  const [rows] = await connection.query(
    "SELECT * FROM CUSTOMER WHERE EMAIL = ?",
    [email]
  );
  return rows.length > 0 ? rows[0] : null;
};

// Find customer by phone number (for 'guest' type)
const findCustomerByContact = async (phoneNumber) => {
  const [rows] = await connection.query(
    "SELECT * FROM CUSTOMER WHERE PHONE_NUMBER = ?",
    [phoneNumber]
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
  updateGuestToUser, // Export the new function
};
