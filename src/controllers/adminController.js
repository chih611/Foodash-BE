const {
  getAllAdmin,
  getAdminById,
  createAdmin,
  updateAdmin,
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

// Create admin API

const createAdminAPI = async (req, res) => {
  const { admin_name, admin_email, admin_password, admin_type } = req.body;

  try {
    await createAdmin({ admin_name, admin_email, admin_password, admin_type });
    res.status(201).json({ message: "Admin created successfully." });
  } catch (error) {
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
};
