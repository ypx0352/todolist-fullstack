const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const TodolistModel = require("../model/todolist");

// check account existence, password with database then extract user_id and name and pass them to login controllor
const loginAuthen = async (req, res, next) => {
  const token = req.headers.authentication;
  if (token) {
    try {
      const decode = await jwt.verify(token, process.env.TOKEN_KEY);
      req.user = { user_id: decode.user_id };
      next();
    } catch (error) {
      return res.status(400).json({
        success: false,
        msg: "Your credential is invalid. Please login again.",
      });
    }
  } else {
    const { email, password } = req.body;
    try {
      const userExist = await TodolistModel.findOne({ email: email });
      if (!userExist) {
        return res.status(401).json({
          success: false,
          msg: "User does not exist. Please register first.",
        });
      } else {
        const passwordMatch = await bcrypt.compare(
          password,
          userExist.password
        );
        if (!passwordMatch) {
          return res
            .status(401)
            .json({ success: false, msg: "Email and password are not match." });
        } else {
          req.user = { user_id: userExist._id, name: userExist.name };
          next();
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, msg: "Server error." });
    }
  }
};

module.exports = loginAuthen;
