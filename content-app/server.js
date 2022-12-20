/* eslint-disable no-undef */
const cors = require("cors");
var express = require("express");
var app = express();
const path = require("path");

app.use(cors());
app.use("/child", express.static(path.join(__dirname, "dist")));

app.listen(3000);
