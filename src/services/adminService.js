const connection = require("../config/database");

// Get all customers
const getAllAdmin = async () => {
  const [rows] = await connection.query("SELECT * FROM ADMIN");
  return rows;
};

const getAdminById = async (adminId) => {
  const [rows] = await connection.query(
    "SELECT * FROM ADMIN WHERE ADMIN_ID = ?",
    [adminId]
  );
  return rows.length > 0 ? rows[0] : null;
};

const createAdmin = async ({
  admin_name,
  admin_email,
  admin_password,
  admin_type,
}) => {
  const sql = `
        INSERT INTO ADMIN 
        (ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_TYPE) 
        VALUES (?, ?, ?, ?)
        `;
  const values = [admin_name, admin_email, admin_password, admin_type];

  await connection.query(sql, values);
};

const updateAdmin = async ({
  adminId,
  admin_name,
  admin_email,
  admin_password,
  admin_type,
}) => {
  const sql = `
            UPDATE ADMIN 
            SET 
                ADMIN_NAME = ?, 
                ADMIN_EMAIL = ?, 
                ADMIN_PASSWORD = ?,
                ADMIN_TYPE = ?
            WHERE ADMIN_ID = ?;
        `;
  const values = [admin_name, admin_email, admin_password, admin_type, adminId];

  await connection.query(sql, values);
};

module.exports = {
  getAllAdmin,
  getAdminById,
  createAdmin,
  updateAdmin,
};
