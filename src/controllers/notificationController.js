const {
  handleGetAllAPI,
  handleCreateAPI,
  handleUpdateAPI,
  handleDeleteAPI,
} = require("../models/handlingModel");
const { getAllNotifications } = require("../services/notificationService");

const getAllNotificationsAPI = async (req, res) => {
  const { rows } = await getAllNotifications();
  return await handleGetAllAPI(res, rows);
};

module.exports = {
  getAllNotificationsAPI,
};
