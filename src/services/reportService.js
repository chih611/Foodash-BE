const connection = require("../config/database");

const getAllCurrentCategorySales = async () => {
  const [rows] = await connection.query(
    "SELECT Category, Sold, Stock, Created, Expired FROM foodash.SalesByCategory_currentMonth;"
  );
  return { rows };
};

module.exports = {
  getAllCurrentCategorySales,
};
