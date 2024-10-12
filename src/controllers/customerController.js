// customerController.js
const {
  getAllCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomerById,
  findCustomerByEmail,
  findCustomerByContact,
  findCustomerById,
  validateCustomerSignIn,
} = require("../services/customerService");

// Get all customers
const getAllCustomersAPI = async (req, res) => {
  try {
    const customers = await getAllCustomers();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve customers." });
  }
};

const findCustomerByIdAPI = async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await findCustomerById(id);
    if (customer) {
      res.status(200).json(customer);
    } else {
      res.status(404).json({ message: "Customer not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve customer by ID." });
  }
};

// Create customer API
const createCustomerAPI = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    address,
    postcode,
    state,
    city,
    password,
    type,
    dob,
    gender,
    abn,
    dietaryPreference,
    loyaltyPoints,
    favourites,
  } = req.body;

  try {
    const customerId = await createCustomer({
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      postcode,
      state,
      city,
      customerType: type === "user" ? "user" : "guest",
      password: type === "user" ? password : null,
      dob,
      gender,
      abn,
      dietaryPreference,
      loyaltyPoints,
      favourites,
    });
    res
      .status(201)
      .json({ message: "Customer created successfully.", customerId });
  } catch (error) {
    res.status(500).json({ message: "Failed to create customer." });
  }
};

// Find customer by email API
const findCustomerByEmailAPI = async (req, res) => {
  const { email } = req.params;
  try {
    const customer = await findCustomerByEmail(email);
    if (customer) {
      res.status(200).json(customer);
    } else {
      res.status(404).json({ message: "Customer not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve customer by email." });
  }
};

// Find customer by contact API
const findCustomerByContactAPI = async (req, res) => {
  const { phoneNumber } = req.params;
  try {
    const customer = await findCustomerByContact(phoneNumber);
    if (customer) {
      res.status(200).json(customer);
    } else {
      res.status(404).json({ message: "Customer not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve customer by contact." });
  }
};

// Sign in customer API
const signInCustomerAPI = async (req, res) => {
  const { email, password } = req.body;
  try {
    const customer = await validateCustomerSignIn(email, password);
    if (customer) {
      res.status(200).json({ message: "Sign-in successful", customer });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to sign in customer." });
  }
};

// Update customer API
const updateCustomerAPI = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    await updateCustomer({ customerId: id, ...updatedData });
    res.status(200).json({
      message: "Customer updated successfully.",
      customer: updatedData,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update customer." });
  }
};
// Delete customer API
const deleteCustomerAPI = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteCustomerById(id);
    res.status(200).json({ message: "Customer deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete customer." });
  }
};

module.exports = {
  getAllCustomersAPI,
  findCustomerByIdAPI,
  createCustomerAPI,
  updateCustomerAPI,
  deleteCustomerAPI,
  findCustomerByEmailAPI,
  findCustomerByContactAPI,
  signInCustomerAPI,
};
