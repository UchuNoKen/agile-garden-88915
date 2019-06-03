// require passport
// require passport-google-oauth20
// require keys
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

//  tell passport to use new instance of GoogleStrategy
//  passed object with ID and secret to new GoogleStrategy()
//  passed third configuration option of callbackURL
//  added second parameter, callback function with accessToken parameter
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true // trust Heroku proxy
    },
    // create user record
    async (accessToken, refreshToken, profile, done) => {
      // console.log("access token", accessToken);
      // console.log("refresh token", refreshToken);

      // returns a promise
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      // don't have a user record with this ID, make a new one
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
