const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

var authenticate = function (username, password, callback) {
  if (username === "nick") {
    return callback(null, {
      username: 'Nick',
      displayName: 'Nick Z'
    });
  } else {
    return callback(null, false);
  }
  return callback({
    message: 'Error'
  });
};

passport.use(new BasicStrategy(authenticate));

exports.isAuthenticated = passport.authenticate('basic', { session: false });
