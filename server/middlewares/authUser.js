const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
require("dotenv").config();
const handleErrors = require("../utils/handelError");

const authUser = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    

    if (!token) {
      return next(handleErrors(401, "Unauthorized: Token not found, please login"));
    }

    const tokenValue = token.split(" ")[1];
    

    const key = process.env.JWT_key;
    

    const decoded = jwt.verify(tokenValue, key);
    

    const id = decoded.id;
    

    const user = await User.findById(id);
   

    if (!user) {
      return next(handleErrors(404, "User not found, please register"));
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth error:", error);
    return next(handleErrors(401, "Invalid Token or Session Expired"));
  }
};

module.exports = authUser;
