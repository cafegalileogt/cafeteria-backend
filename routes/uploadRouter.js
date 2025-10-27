// routes/uploadRouter.js
const { uploadImage } = require("../controllers/uploaderController");
const upload = require("../middlewares/uploadMiddleware");

const router = require("express").Router();

router.post("/uploadImage", upload.single("imagen"), uploadImage);

module.exports = router;