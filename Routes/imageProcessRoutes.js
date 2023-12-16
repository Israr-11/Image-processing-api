const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const processImage = require("../Controllers/imageProcess");

router.post("/resize", upload.single("image"), processImage.postToProcessImage);

module.exports = router;
