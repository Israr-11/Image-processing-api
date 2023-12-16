const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.memoryStorage();

// It creates a middleware that parses incoming multipart/form-data and makes the
// uploaded file available in the req.file object.

const upload = multer({ storage: storage });

const processImage = require("../Controllers/imageProcess");

router.post("/resize", upload.single("image"), processImage.postToProcessImage)

module.exports=router;