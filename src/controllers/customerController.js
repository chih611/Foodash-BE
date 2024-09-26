const {
  getAllCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomerById,
  findCustomerByEmail,
  findCustomerByContact,
  updateGuestToUser,
} = require("../services/customerService");
const {
  handleGetAllAPI,
  handleCreateAPI,
  handleUpdateAPI,
  handleDeleteAPI,
} = require("../models/handlingModel");

// Get all customers
const getAllCustomersAPI = async (req, res) => {
  const { rows } = await getAllCustomers();
  await handleGetAllAPI(res, rows);
};

// Create customer API
const createCustomerAPI = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    address,
    password,
    type,
    dob, // Added dob field
    gender, // Added gender field
  } = req.body;

  // Determine if the customer type is 'user' or 'guest'
  const customerType = type === "user" ? "user" : "guest";

  // Check if customer already exists by email (for user) or phone number (for guest)
  let existingCustomer;
  if (customerType === "user") {
    existingCustomer = await findCustomerByEmail(email);
  } else {
    existingCustomer = await findCustomerByContact(phoneNumber);
  }

  // If the customer doesn't exist, create a new one
  if (!existingCustomer) {
    await createCustomer({
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      customerType,
      password: customerType === "user" ? password : null, // Password only for 'user' type
      dob, // Include dob
      gender, // Include gender
    });
    await handleCreateAPI(res);
  } else {
    // If the existing customer is a guest and now trying to sign up as a user
    if (existingCustomer.CUSTOMER_TYPE === "guest" && customerType === "user") {
      // Update the existing guest record to become a registered user
      await updateGuestToUser(existingCustomer.CUSTOMER_ID, {
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
        password,
        dob, // Include dob when updating guest to user
        gender, // Include gender when updating guest to user
      });
      res.status(200).json({
        message: "Guest record updated to a registered user successfully.",
        customer: { ...existingCustomer, CUSTOMER_TYPE: "user" },
      });
    } else {
      // If the customer is already a user or duplicate email attempt
      res
        .status(409)
        .json({ message: "Customer with this email already exists." });
    }
  }
};

// Update customer API
const updateCustomerAPI = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName } = req.body;
  await updateCustomer(firstName, lastName, id);
  await handleUpdateAPI(res);
};

// Delete customer API
const deleteCustomerAPI = async (req, res) => {
  const { id } = req.params;
  await deleteCustomerById(id);
  await handleDeleteAPI(res, id);
};

module.exports = {
  getAllCustomersAPI,
  createCustomerAPI,
  updateCustomerAPI,
  deleteCustomerAPI,
};
