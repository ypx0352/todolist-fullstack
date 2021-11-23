const router = require("express").Router();
const login = require('../contorllor/login')


router.post("/", login);

module.exports = router;
