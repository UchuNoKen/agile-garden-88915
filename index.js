// require express using CommonJS modules
const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
require("./services/passport");

mongoose.connect(keys.mongoURI);

// Create an express app by calling express function
const app = express(
  "mongodb+srv://foobacca:<PASSWORD>@maily-rucmt.mongodb.net/test?retryWrites=true"
);

require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App running at port ${PORT}`);
});
