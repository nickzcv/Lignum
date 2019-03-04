var passport = require('passport');
var User = require('../models/user');

module.exports.login = function(req, res) {

   if(!req.body.email || !req.body.password) {
     res.json({
       error: true,
       errorDescription: 'Empty email or password.',
     });
     return;
   }

  passport.authenticate('local', function(err, user, info){
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);

};