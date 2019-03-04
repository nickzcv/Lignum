const express = require('express');
const router = express.Router();              // get an instance of the express Router
//Define mongoose Schema
var User = require('../models/user');

var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});
var ctrlAuth = require('../controllers/authentication');
router.post('/login', ctrlAuth.login);


router.route('/users')
	// create a User (accessed at POST /api/users)
  // Registration
	.post(function(req, res) {
		var user = new User();
		
		user.email = req.body.email;
		user.password = req.body.password;
    user.name = null;
    user.middleName = null;
    user.lastName = null;
    user.country = null;
    user.city = null;
    user.work = null;
    user.position = null;
    user.photo = null;
    user.phone1 = null;
    user.phone2 = null;
    user.created_at = new Date();
    user.updated_at = new Date();
    user.notes = null;
    user.status = 'NEW';
    user.isActive = true;

		// save the user and check for errors
		user.save(function(err) {
			if (err)
				res.json(err);

			res.json({ message: 'User created!' });
		});

	})
	// get all the users (accessed at GET /api/users)
	.get(auth, function(req, res) {
    User.find({}, function(err, user) {
      if (err)
        res.json(err);

      res.json(user);
    });
	});

// ----------------------------------------------------
router.route('/user/:user_id')
// get the user with :user_id
	.get(function(req, res) {
		User.findById(req.params.user_id, function(err, user) {
			if (err)
				res.json(err);

			res.json(user);
		});
	})
	// update
	.put(auth, function(req, res) {
		User.findById(req.params.user_id, function(err, user) {

			if (err)
				res.json(err);

      user.name = req.body.name;
      user.middleName = req.body.middleName;
      user.lastName = req.body.lastName;
      user.country = req.body.country;
      user.city = req.body.city;
      user.work = req.body.work;
      user.position = req.body.position;
      user.phone1 = req.body.phone1;
      user.phone2 = req.body.phone2;
      user.photo = req.body.photo;
      user.updated_at = new Date();
      user.status = 'UPDATED';
      user.isActive = req.body.isActive;

			user.save(function(err) {
				if (err)
					res.json(err);

				res.json({ message: 'User updated!' });
			});

		});
	})
	// delete
	.delete(function(req, res) {
	  /*
     TODO: uncomment when admin panel will be ready
     TODO: check for hacking
		User.remove({
			_id: req.params.user_id
		}, function(err, user) {
			if (err)
				res.json(err);

			res.json({ message: 'Successfully deleted' });
		});
		*/
	});

router.route('/user-email-check/')
  .get(function(req, res) {
    User.findOne({'email': req.query.email}, function(err, email) {
      if (err)
        res.json(err);

      if (email) {
        res.json({exist: true});
      } else {
        res.json({exist: false});
      }
    });
  });

module.exports = router;