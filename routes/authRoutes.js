// route handler for /auth/google
// GoogleStrategy has an internal identifier of string 'google',
// passport associates authenicating using GoogleStrategy with the string
// 'profile' and 'email' are the scopes that we request from google
const passport = require("passport");

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get("/auth/google/callback", passport.authenticate("google"), (req, res) => {
    res.redirect("/surveys");
  });

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
