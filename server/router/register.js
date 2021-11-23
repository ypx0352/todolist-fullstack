const router = require("express").Router();
const register = require('../contorllor/register')


router.post("/", register);

module.exports = router;
