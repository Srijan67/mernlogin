const jwt = require("jsonwebtoken");
const User = require("../models/userReg");
require("dotenv").config();
const middleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;
    // console.log("token is: " + token);
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    const rootUser = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });
    if (!rootUser) {
      throw new Error("user not found!");
    }
    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;
    // console.log("data send to about form middleware");
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
module.exports = middleware;
