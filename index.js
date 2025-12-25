require("dotenv").config();
require("./config/dbConnect.js");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require("cors");
const router = require("./routes/index.js");

app.use(cors());
app.use(express.json());
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
