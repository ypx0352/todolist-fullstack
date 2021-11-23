require("dotenv").config();
const express = require("express");
const cors = require("cors");
const listRouter = require("./router/list");
const loginRouter = require("./router/login");
const registerRouter = require("./router/register");
const loginAuthen = require("./contorllor/loginAuthen");
const listAuthen = require("./contorllor/listAuthen");
const registerAuthen = require("./contorllor/registerAuthen");

const app = express();

app.use([cors(), express.json(), express.urlencoded({ extended: false })]);

app.use("/api/list", listAuthen, listRouter);

app.use("/api/register", registerAuthen, registerRouter);

app.use("/api/login", loginAuthen, loginRouter);

app.listen(1100, () => console.log("server listening on port 1100"));
