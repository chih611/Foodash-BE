const connection = require("../config/database");

const getAllCurrentCategorySales = async () => {
  const [rows] = await connection.query(
    "SELECT Category, Sold, Stock, Created, Expired FROM foodash.SalesByCategory_currentMonth;"
  );
  return { rows };
};


const getSalesSumByMonth = async () => {
  const [rows] = await connection.query(
    "SELECT Items, `Product Sales`, Tax, Discount, `Gross Sales`, `Net Sales` FROM foodash.Sale_summary_by_month;"
  );
  return { rows };
};

module.exports = {
  getAllCurrentCategorySales,
  getSalesSumByMonth,
};
