const connection = require("../config/database");

const getAllCurrentCategorySales = async () => {
  const [rows] = await connection.query(
    "SELECT Category, Sold, Stock, Created, Expired FROM foodash.SalesByCategory_byMonth WHERE `Month` = MONTH(CURRENT_DATE());"
  );
  return { rows };
};

const getSalesSumByMonth = async (month) => {
  const [rows] = await connection.query(
    "SELECT Items, `Product Sales`, Tax, Discount, `Gross Sales`, `Net Sales`, Month FROM foodash.Report_summary_byMonth WHERE Report_summary_byMonth.`Month` = ?;",
    [month]
  );
  return { rows };
};

const getSaleRports = async () => {
  const [rows] = await connection.query(
    "SELECT Category, Product, Sold, `Due Date`,Sales, Tax, Discount, `Net Sales`FROM foodash.Sale_Report;"
  );
  return { rows };
};

module.exports = {
  getAllCurrentCategorySales,
  getSalesSumByMonth,
  getSaleRports,
};
