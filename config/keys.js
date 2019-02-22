// if env var from heroku is production
if (process.env.NODE_ENV === "production") {
  // we are in production - return the prod set of keys
  module.exports = require("./prod");
} else {
  // we are in development - return the dev keys
  module.exports = require("./dev");
}

// google userid
// profile:  { id: '115870095102950656352'
