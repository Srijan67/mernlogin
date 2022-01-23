const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("Database successfully connected");
  })
  .catch((err) => console.log("Error is: " + err));
