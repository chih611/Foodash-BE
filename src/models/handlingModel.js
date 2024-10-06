const handleGetAllAPI = async (res, rows, fields) => {
  if (rows.length === 0) {
    res.send(`No data found!!!`);
  } else {
    res.send({ rows: rows, fields: fields });
  }
};

const handleCreateAPI = async (res) => {
  res.status(200).json("Created successfully!");
};

const handleUpdateAPI = async (res) => {
  res.status(200).json("Updated successfully!");
};
const handleDeleteAPI = async (res, id) => {
  res.status(200).json(`Item ${id} has been deleted successfully!`);
};
module.exports = {
  handleGetAllAPI,
  handleCreateAPI,
  handleUpdateAPI,
  handleDeleteAPI,
};
