/* eslint-disable quotes */
const express = require("express");

// setup express App
const app = express();

// listen for request
app.listen(process.env.port || 3000, () => {
  console.log("Server created");
});
