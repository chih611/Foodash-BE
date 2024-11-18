const cloudinary = require("cloudinary").v2;
require('dotenv').config();

// Configure Cloudinary using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Add to your .env file
  api_key: process.env.CLOUDINARY_API_KEY,       // Add to your .env file
  api_secret: process.env.CLOUDINARY_API_SECRET, // Add to your .env file
});

const uploadAPI = (req, res) => {
  if (!req.file) {
    return res.status(400).send({ error: 'No file uploaded!' });
  }
  try {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'foodash' }, // Specify folder where the image will be stored
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return res.status(500).json({ error: error.message });
        }
        res.status(200).json({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    );

    // Pipe the file buffer to the Cloudinary upload stream
    const fileBuffer = req.file.buffer;
    const stream = require('stream');
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileBuffer);
    bufferStream.pipe(uploadStream);
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  uploadAPI
};
