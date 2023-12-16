const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const imageProcessingRoute=require("./Routes/imageProcessRoutes")

const app = express();
dotenv.config();
app.use(cors());

app.use("/image", imageProcessingRoute)

const port = process.env.PORT || 8080;
app.listen(port, () => console.log("Listening at port", port));
