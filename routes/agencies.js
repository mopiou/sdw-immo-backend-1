var express = require('express');
var Agency = require('../models/agencies');
var User = require('../models/users');
var functions = require('../functions');
var router = express.Router();

/* POST new agency */
router.post('/', function(req, res) {
  var agency = new Agency();

  var address = {'building': req.body.building,
    'street': req.body.street,
    'zipcode': req.body.zipcode,
    'city': req.body.city,
    'country': req.body.country};

  agency.state = req.body.state || true;
  agency.name = req.body.name;
  agency.address = address;
  agency.phone = req.body.phone;
  agency.email = req.body.email;

  agency.save(function(err) {
    if (err)
      res.json(err);
    res.json(agency);
  });
});

/* GET agencies listing. */
router.get('/', function(req, res, next) {
  Agency.find(function(err, agencies) {
    if (err)
      res.json(err);
    res.json(agencies);
  });
});

/* GET agency. */
router.get('/:agency_id', function(req, res, next) {
  Agency.findById(req.params.agency_id, function(err, agency) {
    if (err)
      res.json(err);
    res.json(agency);
  });
});

/* GET agency users. */
router.get('/:agency_id/users', function(req, res, next) {
  Agency.findById(req.params.agency_id, function(err, agency) {
    if (err)
      res.json(err);
    res.json(agency.users);
  }).populate('users.id');
});

/* GET agency sales. */
router.get('/:agency_id/sales', function(req, res, next) {
  Agency.findById(req.params.agency_id, function(err, agency) {
    if (err)
      res.json(err);
    res.json(agency.sales);
  }).populate('sales.id');
});

/* GET agency rents. */
router.get('/:agency_id/rents', function(req, res, next) {
  Agency.findById(req.params.agency_id, function(err, agency) {
    if (err)
      res.json(err);
    res.json(agency.rents);
  }).populate('rents.id');
});

/* PUT update agency. */
router.put('/:agency_id', function(req, res, next) {
  Agency.findById(req.params.agency_id, function(err, agency) {
    if (err)
      res.json(err);

    var address = {'building': req.body.building || rent.address.building,
      'street': req.body.street || rent.address.street,
      'zipcode': req.body.zipcode || rent.address.zipcode,
      'city': req.body.city || rent.address.city,
      'country': req.body.country || rent.address.country};

    agency.state = req.body.state || agency.state;
    agency.name = req.body.name || agency.name;
    agency.address = address || agency.address;
    agency.phone = req.body.phone || agency.phone;
    agency.email = req.body.email || agency.email;

    if ( typeof req.body.user_id !== 'undefined' && req.body.user_id )
      User.findById(req.body.user_id, function(err, user) {
        if (err)
          res.json(err);
        agency.users.push({id: user._id});
      });

    agency.save(function(err) {
      if (err)
        res.json(err);
      res.json(agency);
    });
  });
});

/* DELETE agency. */
router.delete('/:agency_id', function(req, res, next) {
  Agency.findByIdAndRemove(req.params.agency_id, function(err, agency) {
    if (err)
      res.json(err);
    res.json(agency);
  });
});

module.exports = router;
