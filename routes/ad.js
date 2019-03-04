const express = require('express');
const router = express.Router();
//Define mongoose Schema
var Ad = require('../models/ad');

var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

router.route('/ads')
	// create Ad (accessed at POST /api/ads)
	.post(auth, function(req, res) {
		var ad = new Ad();

    ad.type = req.body.type;
    ad.object = req.body.object;
    ad.category = req.body.category;
    ad.title = req.body.title;
    ad.description = req.body.description || null;
    ad.country = req.body.country;
    ad.city = req.body.city;
    ad.price = req.body.price || null;
    ad.photo = req.body.photo || null;
    ad.expirationDate = req.body.expirationDate;
    ad.contacts = req.body.contacts || null;
    ad.created_at = new Date();
    ad.updated_at = new Date();
    ad.notes = null;
    ad.status = null;
    ad.isActive = true;
    ad.userId = req.body.userId;
    ad.userName = req.body.userName || null;
    ad.company = null;
    ad.favorites = [];

		// save the ad and check for errors
    ad.save(function(err) {
			if (err)
				res.json(err);

			res.json({ message: 'Ad created!' });
		});

	})
	// get all the ads (accessed at GET /api/ads)
	.get(function(req, res) {
    var limitParam = 0,
        skipParam = 0,
        searchParams = {};

    if (req.query.limit) {
      limitParam = parseInt(req.query.limit);
    }
    if (req.query.skip) {
      skipParam = parseInt(req.query.skip);
    }
    if (req.query.object) {
      searchParams.object = req.query.object;
    }
    if (req.query.type) {
      searchParams.type = req.query.type;
    }
    if (req.query.category) {
      searchParams['category.id'] = parseInt(req.query.category);
    }
    if (req.query.country) {
      searchParams['country.id'] = parseInt(req.query.country);
    }
    if (req.query.city) {
      searchParams['city.id'] = parseInt(req.query.city);
    }

    var q = Ad.find({"$and": [searchParams]}).sort({'created_at': -1}).skip(skipParam).limit(limitParam);
    q.exec(function(err, ad) {
      if (err) {
        res.json(err);
      } else {
        res.json(ad);
      }
    });
	});

// on routes that end in /ads/:userId
// ----------------------------------------------------
router.route('/ads/:userId')
  // get the ads by userId
  .get(function(req, res) {

    Ad.find({
        'userId': req.params.userId
      }, function(err, ads) {
      if (err)
        res.json(err);

      res.json(ads);
    });
  });

// on routes that end in /ad/:ad_id
// ----------------------------------------------------
router.route('/ad/:ad_id')
// get the ad with :ad_id
	.get(function(req, res) {
		Ad.findById(req.params.ad_id, function(err, ad) {
			if (err) {
        res.json({'error': true});
      } else {
        res.json(ad);
      }

		});
	})
	// update
	.put(auth, function(req, res) {
    Ad.findById(req.params.ad_id, function(err, ad) {

      if (err) {
        res.json(err);
      } else {
        ad.type = req.body.type;
        ad.object = req.body.object;
        ad.category = req.body.category;
        ad.title = req.body.title;
        ad.description = req.body.description;
        ad.country = req.body.country;
        ad.city = req.body.city;
        ad.price = req.body.price;
        ad.photo = req.body.photo;
        ad.expirationDate = req.body.expirationDate;
        ad.contacts = req.body.contacts;
        ad.updated_at = new Date();
        ad.status = 'UPDATED';

        ad.save(function(err) {
          if (err) {
            res.json(err);
          } else {
            res.json({ message: 'Ad updated!' });
          }

        });
      }

		});
	})
	// delete
	.delete(auth, function(req, res) {
	  /*
	  TODO: uncomment when admin panel will be ready
	  TODO: check for hacking
		Ad.remove({
			_id: req.params.ad_id
		}, function(err, ad) {
			if (err)
				res.json(err);

			res.json({ message: 'Successfully deleted' });
		});
		*/
	});



module.exports = router;