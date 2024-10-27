// const connection = require('../config/database');
const {
  getAllItems,
  createItem,
  updateItem,
  deleteItembyId,
  getItemByCategory,
  searchItemByName,
  getModificationById,
  getItemById,
  getAllLabels,
  getAllIngredients,
  getAllModifications,
} = require("../services/itemService");
const {
  handleGetAllAPI,
  handleCreateAPI,
  handleUpdateAPI,
  handleDeleteAPI,
} = require("../models/handlingModel");

// const getHomePage = (req, res) => {
//   return res.render("home");
// };

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
    res.status(500).json({ message: "Error fetching all items." });
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
  const { name, quantity, price,category_id,description,special} = req.query;
  // const debug = req.query;
  // console.log(debug);
  await createItem(name, quantity, price,category_id,description,special);
  await handleCreateAPI(res);
};

const updateItemAPI = async (req, res) => {
  try {
    const itemId = req.params.id; // Ensure this is correctly reading the `id`
    const {
      item_name,
      quantity,
      unit_price,
      category_id,
      description,
      expiry_date,
      special_status,
    } = req.body;

    // Create a file path only if an image is uploaded
    let picturePath = null;
    if (req.file) {
      picturePath = `/uploads/others/${req.file.filename}`;
    }

    // Ensure itemId is not undefined
    if (!itemId) {
      return res.status(400).json({ message: "Item ID is required." });
    }

    // Update item by calling the service function
    await updateItem(
      itemId,
      item_name,
      quantity,
      unit_price,
      category_id,
      picturePath,
      description,
      expiry_date,
      special_status
    );

    res.status(200).json({
      message: "Item updated successfully!",
      picturePath: picturePath ? `http://localhost:8080${picturePath}` : null,
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
};
