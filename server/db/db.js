// const mongoose = require("mongoose");
// require("dotenv").config();
// const handleErrors = require("../utils/handelError");

// const dbConnection = async () => {
//   try {
//     await mongoose.connect(process.env.DBURI).then(() => {
//       console.log(" Database connected successfully");
//     });
//   } catch (error) {
//     const dbError = handleErrors(500, "Database connection failed"); 
//     console.error(dbError.message);
//     process.exit(1);
//   }
// };

// module.exports = dbConnection;


const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = async () => {
  try {
    const uri = process.env.DBURI;
    
    if (!uri) throw new Error("DBURI not found in environment");

    await mongoose.connect(uri);

    console.log("Database connected successfully");
  } catch (error) {
    console.error(" Database connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = dbConnection;
