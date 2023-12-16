const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const sharp = require("sharp");
const multer = require("multer");

const app = express();
dotenv.config();
app.use(cors());

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/resize", upload.single("image"), async (req, res) => {
  try {
    const { width, height } = req.body;
    const imageBuffer = req.file.buffer;

    const outputBuffer = await sharp(imageBuffer)
      .resize(parseInt(width), parseInt(height))
      .toBuffer();

    // Set headers for file download
    res.set({
      "Content-Type": "image/png",
      "Content-Disposition": `attachment; filename=modified_image.png`,
    });

    // Send the modified image as the response
    res.send(outputBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log("Listening at port", port));
