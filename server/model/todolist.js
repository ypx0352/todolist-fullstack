const connection = require("../database");
const mongoose = require("mongoose");

// define the schema of the collection
const todolistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    todos: [
      {
        finish: {
          type: Boolean,
          default: false,
        },
        content: {
          type: String,
          required: true,
        },
        createdAt: Date,
        updatedAt: Date,
      },
    ],
  },
  { timestamps: true }
);

const TodolistModel = connection.model("NewTodolist", todolistSchema);

module.exports = TodolistModel;
