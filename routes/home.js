const express = require('express');
const router = express.Router();

var Ad = require('../models/ad');

router.route('/home/ads')
.get(function(req, res) {
  Ad.find({}, function(err, ad) {
    if (err)
      res.json(err);

    res.json(ad);
  });
});





module.exports = router;