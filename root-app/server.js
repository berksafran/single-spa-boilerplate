/* eslint-disable no-console */
/* eslint-disable no-undef */
const cors = require("cors");
var express = require("express");
var app = express();
const path = require("path");

app.use(cors());
app.use("", express.static(path.join(__dirname, "dist"))); // localhost:3000/safran-header-app.js

console.log("Server has been started on 3000");

app.listen(3000);
