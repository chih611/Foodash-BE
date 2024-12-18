const cloudinary = require("cloudinary").v2;

const {
  getAllItems,
  createItem,
  createItemModificationByItemId,
  updateItem,
  deleteItembyId,
  getItemByCategory,
  searchItemByName,
  getModificationById,
  getItemById,
  getAllLabels,
  getAllIngredients,
  getAllModifications,
  getSpecificAdminItems,
  updateModificationByItemId,
  getAllAdminItems,
  getAdminItemDetail,
  getAdminModificationbyId,
  getModificationByIdForUpdate,
} = require("../services/itemService");
const {
  handleGetAllAPI,
  handleCreateAPI,
  handleUpdateAPI,
  handleDeleteAPI,
  handleGetOneAPI,
} = require("../models/handlingModel");


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Add to your .env file
  api_key: process.env.CLOUDINARY_API_KEY,       // Add to your .env file
  api_secret: process.env.CLOUDINARY_API_SECRET, // Add to your .env file
});

const getAllItemsAPI = async (req, res) => {
  try {
    const { rows } = await getAllItems();

    // Convert BLOB images to base64 if they exist
    const updatedRows = rows.map((item) => {
      if (item.PICTURE) {
        // Convert BLOB to Base64
        const base64Image = item.PICTURE.toString("base64");
        // Create a URL for the image
        item.PICTURE = `data:image/png;base64,${base64Image}`;
      } else {
        item.PICTURE = null; // Or a default image URL
      }
      return item;
    });

    await handleGetAllAPI(res, updatedRows);
  } catch (error) {
    console.error(`Error fetching all items: ${error.message}`);
    res.status(500).json(error);
  }
};

const getItemByIdAPI = async (req, res) => {
  const { id } = req.params;
  const rows = await getItemById(id);
  if (rows.length > 0) {
    const item = rows[0];
    if (item.PICTURE) {
      // Convert Buffer to Base64
      const base64Image = item.PICTURE.toString("base64");
      // Create a URL for the image
      item.PICTURE = `data:image/png;base64,${base64Image}`;
    } else {
      item.PICTURE = null; // Or a default image URL
    }
    res.status(200).json(item);
  } else {
    res.status(404).json({ message: "No items found" });
  }
};

const createItemAPI = async (req, res) => {
  const { name, quantity, price, category_id, description, special, picture } =
    req.query;
  await createItem(name, quantity, price, category_id, description, special, picture);
  await handleCreateAPI(res);
};

const createItemModificationAPI = async (req, res) => {
  const { itemId, modification, ingredients, labelId } = req.query;
  await createItemModificationByItemId(
    itemId,
    modification,
    ingredients,
    labelId
  );
  await handleCreateAPI(res);
};

const updateItemAPI = async (req, res) => {
  const {
    itemName,
    quantity,
    unitPrice,
    category,
    picture,
    description,
    expDate,
    specialStt,
  } = req.body;
  const { itemId } = req.params;
  try {
    const updateData = {};
    await updateItem(
      itemId,
      itemName,
      quantity,
      unitPrice,
      category,
      picture,
      description,
      expDate,
      specialStt
    );

    res.status(200).json({
      message: "Item updated successfully!",
    });
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({
      message: "Error occurred while updating item.",
      error: error.message,
    });
  }
};

const deleteItemAPI = async (req, res) => {
  const { id } = req.params;
  await deleteItembyId(id);
  await handleDeleteAPI(res, id);
};

const getItemByCategoryAPI = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const items = await getItemByCategory(categoryId);
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getModificationByIdAPI = async (req, res) => {
  const { id } = req.params;
  const rows = await getModificationById(id);
  if (rows.length > 0) {
    res.status(200).json(rows);
  } else {
    res.status(404).json({ message: "No items found" });
  }
};

const getAllModificationsAPI = async (req, res) => {
  const { rows } = await getAllModifications();
  await handleGetAllAPI(res, rows);
};

const searchItemByNameAPI = async (req, res) => {
  const { itemName } = req.params;
  try {
    const rows = await searchItemByName(itemName);
    if (rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(404).json({ message: "No items found for this search" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error searching items by name" });
  }
};

const getAllLabelsAPI = async (req, res) => {
  const { rows } = await getAllLabels();
  await handleGetAllAPI(res, rows);
};

const getAllIngredientsAPI = async (req, res) => {
  try {
    const ingredients = await getAllIngredients();
    res.status(200).json(ingredients);
  } catch (error) {
    console.error(`Error fetching ingredients: ${error.message}`);
    res.status(500).json({ message: "Error fetching ingredients" });
  }
};

const getAllAdminItemsAPI = async (req, res) => {
  const { rows } = await getAllAdminItems();
  await handleGetAllAPI(res, rows);
};

const getAdminItemDetailAPI = async (req, res) => {
  const { item_id } = req.params;
  const { rows } = await getAdminItemDetail(item_id);
  await handleGetOneAPI(res, rows);
};

const getAdminModificationbyIdAPI = async (req, res) => {
  const { mod_id } = req.params;
  const { rows } = await getAdminModificationbyId(mod_id);
  await handleGetAllAPI(res, rows);
};

const getModificationByIdForUpdateAPI = async (req, res) => {
  const { mod_id } = req.params;
  const rows = await getModificationByIdForUpdate(mod_id);
  await handleGetOneAPI(res, rows);
};

const updateItemModificationByItemIdAPI = async (req, res) => {
  const { Modification, Ingredients } = req.body;
  const { ModId } = req.params;
  try {
    await updateModificationByItemId(ModId, Modification, Ingredients);
    await handleUpdateAPI(res); // Assuming handleUpdateAPI sends the response.
  } catch (error) {
    console.error(`Error updating item modification: ${error.message}`);
    res.status(500).json({ message: "Error updating item modification" });
  }
};

module.exports = {
  getAllItemsAPI,
  createItemAPI,
  updateItemAPI,
  deleteItemAPI,
  getItemByIdAPI,
  getItemByCategoryAPI,
  getModificationByIdAPI,
  searchItemByNameAPI,
  getAllLabelsAPI,
  getAllIngredientsAPI,
  getAllModificationsAPI,
  getAllAdminItemsAPI,
  getAdminItemDetailAPI,
  getAdminModificationbyIdAPI,
  createItemModificationAPI,
  updateItemModificationByItemIdAPI,
  getModificationByIdForUpdateAPI,
};
