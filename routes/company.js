const express = require('express');
const router = express.Router();
//Define mongoose Schema
var Company = require('../models/company');

var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

router.route('/companies')
	// create Company
	.post(auth, function(req, res) {
		var company = new Company();

    company.companyName = req.body.companyName;
    company.logo = req.body.logo;
    company.description = req.body.description;
    company.categoryId = req.body.categoryId;
    company.companyFilters = req.body.companyFilters;
    company.country = req.body.country;
    company.city = req.body.city;
    company.address = req.body.address;
    company.phones = req.body.phones;
    company.website = req.body.website;
    company.year = req.body.year;
    company.count = req.body.count;
    company.created_at = new Date();
    company.updated_at = new Date();
    company.isActive = true;
    company.createdBy = req.body.createdBy;

		// save the company and check for the errors
    company.save(function(err) {
			if (err) {
        res.json({
          error: true,
          errorDescription: err,
        });
      } else {
        res.json({
          message: 'Company created!'
        });
      }
		});
	})
  // get all companies (accessed at GET /api/companies)
  .get(function(req, res) {
    Company.find({}, function(err, companies) {
      if (err) {
        res.json({
          error: true,
          errorDescription: err,
        });
      } else {
        res.json(companies);
      }
    });
  });


// on routes that end in /companies/:userId
// ----------------------------------------------------
router.route('/companies/:userId')
  // get the companies by userId
  .get(function(req, res) {

    Company.find({
      'createdBy': req.params.userId
      }, function(err, companies) {
      if (err) {
        res.json({
          error: true,
          errorDescription: err,
        });
      } else {
        res.json(companies);
      }
    });
  });

// on routes that end in /company/:company_id
// ----------------------------------------------------
router.route('/company/:company_id')
  // get the company with :company_id
	.get(function(req, res) {
    Company.findById(req.params.company_id, function(err, company) {
			if (err) {
        res.json({
          error: true,
          errorDescription: err,
        });
      } else {
        res.json(company);
      }
		});
	})

	// update
	.put(auth, function(req, res) {
    Company.findById(req.params.company_id, function(err, company) {

      if (err) {
        res.json({
          error: true,
          errorDescription: err,
        });
      } else {
        company.companyName = req.body.companyName;
        company.logo = req.body.logo;
        company.description = req.body.description;
        company.categoryId = req.body.categoryId;
        company.companyFilters = req.body.companyFilters;
        company.country = req.body.country;
        company.city = req.body.city;
        company.address = req.body.address;
        company.phones = req.body.phones;
        company.website = req.body.website;
        company.year = req.body.year;
        company.count = req.body.count;
        company.updated_at = new Date();
        company.createdBy = req.body.createdBy;

        company.save(function(err) {
          if (err) {
            res.json({
              error: true,
              errorDescription: err,
            });
          } else {
            res.json({
              message: 'Ad updated!'
            });
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