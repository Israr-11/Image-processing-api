const sharp = require("sharp");
const multer = require("multer");

// When you use memoryStorage, Multer stores the file data in memory as a Buffer,
// rather than saving it to the file system.

const storage = multer.memoryStorage();

// It creates a middleware that parses incoming multipart/form-data and makes the
// uploaded file available in the req.file object.

const upload = multer({ storage: storage });

const postToProcessImage = async (req, res) => {
  try {
    const { width, height } = req.body;
    const imageBuffer = req.file.buffer;
    const outputBuffer = await sharp(imageBuffer)
      .resize(int(width), int(height))
      .toBuffer();

    // res.set({
    //     "Content-Type": "image/png",
    //     "Content-Disposition": `attachment; filename=modified_image.png`,
    //   });

    res.status(200).send("SUCCESSFUL", outputBuffer);
  } catch (error) {
    res.status(500).json({Status:"Failed", Description:"Image cannot be resized"});
  }
};

module.exports = { postToProcessImage };
