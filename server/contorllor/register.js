const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const TodolistModel = require("../model/todolist");
const saltRounts = 10;

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const date = new Date();
  const defaultTodos = [
    {
      content: "A Thousand miles begins with a single step.",
      createdAt: date,
      updatedAt: date,
    },
    { content: "Start your success here.", createdAt: date, updatedAt: date },
  ];
  try {
    const hash = await bcrypt.hash(password, saltRounts);
    const result = await TodolistModel.create({
      name: name,
      email: email,
      password: hash,
      todos: defaultTodos,
    });
    const token = await jwt.sign(
      { user_id: result._id },
      process.env.TOKEN_KEY,
      { expiresIn: 30 * 60 }
    );
    res.status(200).json({ success: true, result: { token: token } });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, msg: "Can not create this account." });
  }
};

module.exports = register;
