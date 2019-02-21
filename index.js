// require express using CommonJS modules
const express = require("express");
require("./services/passport");

// Create an express app by calling express function
const app = express();

require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App running at port ${PORT}`);
});
