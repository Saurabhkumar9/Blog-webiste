const mongoose = require("mongoose");
require("dotenv").config();
const handleErrors = require("../utils/handelError");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DBURI).then(() => {
      console.log(" Database connected successfully");
    });
  } catch (error) {
    const dbError = handleErrors(500, "Database connection failed"); 
    console.error(dbError.message);
    process.exit(1);
  }
};

module.exports = dbConnection;
