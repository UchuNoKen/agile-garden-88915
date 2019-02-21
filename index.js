// require express using CommonJS modules
// require passport
// require passport-google-oauth20
// require keys
const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./config/keys");

// Create an express app by calling express function
const app = express();

//  tell passport to use new instance of GoogleStrategy
//  passed object with ID and secret to new GoogleStrategy()
//  passed third configuration option of callbackURL
//  added second parameter, callback function with accessToken parameter
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("access token", accessToken);
      console.log("refresh token", refreshToken);
      console.log("profile: ", profile);
    }
  )
);

// route handler for /auth/google
// GoogleStrategy has an internal identifier of string 'google',
// passport associates authenicating using GoogleStrategy with the string
// 'profile' and 'email' are the scopes that we request from google
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

app.get("/auth/google/callback", passport.authenticate("google"));

// app - represents underlying express server
// get - creates a new route handler
// / - root route handler
// app.get("/", (req, res) => {
//   res.send({ hi: "there" });
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App running at port ${PORT}`);
});
