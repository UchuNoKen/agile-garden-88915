// Import express w/require using CommonJS modules'
// require passport
// require passport-google-oauth20
const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./config/keys");

// Create an express app by calling express function
const app = express();

// tell passport to use new instance of GoogleStrategy
passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret
  })
);

// app - represents underlying express server
// get - creates a new route handler
// / - root route handler
// app.get("/", (req, res) => {
//   res.send({ hi: "there" });
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT);
