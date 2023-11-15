const express = require("express");
const { connectToDatabase } = require("./db");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use("/data", require("./routes/Dataroute"));

const PORT = process.env.PORT || 5000;

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MySQL database:", err);
  });
