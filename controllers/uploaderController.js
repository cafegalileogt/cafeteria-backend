// controllers/uploaderController.js
const cloudinary = require("../utils/cloudinaryConfig");

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No se recibió ningún archivo" });
    }

    const bufferStream = cloudinary.uploader.upload_stream(
      { folder: "cafeteria-galileo" },
      (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: "Error subiendo imagen" });
        }
        res.json({ imageUrl: result.secure_url });
      }
    );

    // Pasar el buffer de Multer a Cloudinary
    bufferStream.end(req.file.buffer);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error subiendo imagen" });
  }
};

module.exports = { uploadImage };