const express = require('express');
const router = express.Router();
var User = require('../models/user');

var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

router.get('/admin', auth, function(req, res) {

  // If no user ID exists in the JWT return a 401
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    // Otherwise continue
    User
    .findById(req.payload._id)
    .exec(function(err, user) {
      res.status(200).json(user);
    });
  }

});



module.exports = router;