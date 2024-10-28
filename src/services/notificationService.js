const connection = require("../config/database");

const getAllNotifications = async () => {
  const [rows] = await connection.query(
    "SELECT NOTI_ID, DESCRIPTION, STATUS, CREATED_DATE FROM foodash.NOTIFICATION ORDER BY CREATED_DATE DESC ;"
  );
  return { rows };
};

module.exports = {
  getAllNotifications,
};
