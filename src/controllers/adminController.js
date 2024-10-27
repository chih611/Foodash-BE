const {
  getAllAdmin,
  getAdminById,
  createAdmin,
  updateAdmin,
  validateAdminSignIn,
} = require("../services/adminService");

// Get all admins
const getAllAdminAPI = async (req, res) => {
  try {
    const admins = await getAllAdmin();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve admins." });
  }
};

const getAdminByIdAPI = async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await getAdminById(id);
    if (admin) {
      res.status(200).json(admin);
    } else {
      res.status(404).json({ message: "Admin not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve admin by ID." });
  }
};

const signInAdminAPI = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await validateAdminSignIn(email, password);
    if (admin) {
      res.status(200).json({ message: "Admin sign-in successful", admin });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to sign in admin." });
  }
};

// Create admin API

const createAdminAPI = async (req, res) => {
  const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_TYPE } = req.body; // Ensure keys match the frontend
  try {
    await createAdmin({
      admin_name: ADMIN_NAME,
      admin_email: ADMIN_EMAIL,
      admin_password: ADMIN_PASSWORD,
      admin_type: ADMIN_TYPE,
    });
    res.status(201).json({ message: "Admin created successfully." });
  } catch (error) {
    console.error("Error in createAdminAPI:", error);
    res.status(500).json({ message: "Failed to create admin." });
  }
};

// Update admin API

const updateAdminAPI = async (req, res) => {
  const { id } = req.params;
  const { admin_name, admin_email, admin_password, admin_type } = req.body;

  try {
    await updateAdmin({
      adminId: id,
      admin_name,
      admin_email,
      admin_password,
      admin_type,
    });
    res.status(200).json({ message: "Admin updated successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to update admin." });
  }
};

module.exports = {
  getAllAdminAPI,
  getAdminByIdAPI,
  createAdminAPI,
  updateAdminAPI,

  signInAdminAPI,
};
