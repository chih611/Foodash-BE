const handleGetAllAPI = async (res, rows) => {
  if (rows.length === 0) {
    res.send(false);
  } else {
    res.send(rows);
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
