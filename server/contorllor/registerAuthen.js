const TodolistModel = require("../model/todolist");

// users can only register using each email address once
const registerAuthen = async (req, res, next) => {
  const { email } = req.body;
  try {
    const result = await TodolistModel.findOne({ email: email });
    if (result) {
      res
        .status(401)
        .json({ success: false, msg: "User is already exist. Please login." });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ success: false, msg: "Database error." });
  }
};

module.exports = registerAuthen;
