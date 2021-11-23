const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const TodolistModel = require("../model/todolist");


const updateItem = async (req, res) => {
  const { user_id } = req.user;
  const { finish, item_id } = req.body;
  const updatedAt = new Date();
  try {
    const result = await TodolistModel.updateOne(
      {
        _id: mongoose.Types.ObjectId(user_id),
        "todos._id": mongoose.Types.ObjectId(item_id),
      },
      { $set: { "todos.$.finish": finish, "todos.$.updatedAt": updatedAt } }
    );
    if (result.modifiedCount === 1) {
      return res
        .status(200)
        .json({ success: true, result: { updatedAt: updatedAt } });
    } else {
      return res.status(500).json({
        success: false,
        msg: "Can not sync the change with server.",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, msg: "Database error." });
  }
};

const deleteItem = async (req, res) => {
  const { user_id } = req.user;
  const { item_id } = req.query;
  try {
    const result = await TodolistModel.updateOne(
      { _id: mongoose.Types.ObjectId(user_id) },
      { $pull: { todos: { _id: mongoose.Types.ObjectId(item_id) } } }
    );
    if (result.modifiedCount === 1) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(500).json({
        success: false,
        msg: "Can not sync the change with server.",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, msg: "Database error." });
  }
};

const createItem = async (req, res) => {
  const { user_id } = req.user;
  const { content } = req.body;
  const date = new Date();
  try {
    const result = await TodolistModel.updateOne(
      { _id: mongoose.Types.ObjectId(user_id) },
      {
        $push: {
          todos: { content: content, createdAt: date, updatedAt: date },
        },
      }
    );
    if (result.modifiedCount !== 1) {
      return res.status(500).json({
        success: false,
        msg: "Can not sync the change with server.",
      });
    } else {
      const result = await TodolistModel.findOne({
        _id: user_id,
      });
      return res
        .status(200)
        .json({ success: true, result: { todo: result.todos.slice(-1)[0] } });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, msg: "Database error." });
  }
};

const readItems = async (req, res) => {
  const { user_id } = req.user;
  try {
    const result = await TodolistModel.findOne({ _id: user_id });
    if (result) {
      const { name, todos } = result;
      res
        .status(200)
        .json({ success: true, result: { name: name, todos: todos } });
    } else {
      res
        .status(401)
        .json({ success: false, msg: "User does not found, please login." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, msg: "Database error." });
  }
};

module.exports = {
  updateItem,
  deleteItem,
  createItem,
  readItems,
};
