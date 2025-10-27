// utils/cloudinaryConfig.js
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: "dlxw0jdft",
  api_key: "395244765132529",
  api_secret: "xQ9rti89DhYl1qluoYPpUBGZMIg",
});

module.exports = cloudinary;