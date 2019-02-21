// require passport
// require passport-google-oauth20
// require keys
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

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
      // console.log("access token", accessToken);
      // console.log("refresh token", refreshToken);
      // console.log("profile: ", profile);
      new User({ googleId: profile.id }).save();
    }
  )
);
