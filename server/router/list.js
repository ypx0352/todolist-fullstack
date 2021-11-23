const router = require("express").Router();

const {
  updateItem,
  deleteItem,
  createItem,
  readItems,
} = require("../contorllor/list");

router.put("/", updateItem);

router.delete("/", deleteItem);

router.post("/", createItem);

router.get("/", readItems);

module.exports = router;
