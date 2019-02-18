// Import express w/require using CommonJS modules
const express = require("express");
// Create an express app by calling express function
const app = express();

// root route handler
app.get("/", (req, res) => {
  res.send({ hi: "there" });
});

const PORT = process.env.PORT || 5000;
app.listen(5000);

// app represents underlying express server
// get creates a new route handler