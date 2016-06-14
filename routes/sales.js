var express = require('express');
var Sale = require('../models/sales');
var functions = require('../functions');
var router = express.Router();

/* POST new sale */
router.post('/', functions.middleware, function(req, res) {
  var sale = new Sale();

  var address = {'building': req.body.building,
    'street': req.body.street,
    'zipcode': req.body.zipcode,
    'city': req.body.city,
    'country': req.body.country};

  var characteristics = {'price': req.body.price,
    'area': req.body.area,
    'rooms': req.body.rooms,
    'bedrooms': req.body.bedrooms};

  sale.type = req.body.type;
  sale.address = address;
  sale.characteristics = characteristics;

  sale.save(function(err) {
    if (err)
      res.json(err);
    res.json(sale);
  });
});

/* GET sales listing. */
router.get('/', function(req, res, next) {
  Sale.find(function(err, sales) {
    if (err)
      res.json(err);
    res.json(sales);
  });
});

/* GET sale. */
router.get('/:sale_id', function(req, res, next) {
  Sale.findById(req.params.sale_id, function(err, sale) {
    if (err)
      res.json(err);
    res.json(sale);
  });
});

/* PUT update sale. */
router.put('/:sale_id', functions.middleware, function(req, res, next) {
  Sale.findById(req.params.sale_id, function(err, sale) {
    if (err)
      res.json(err);

    var address = {'building': req.body.building || rent.address.building,
      'street': req.body.street || rent.address.street,
      'zipcode': req.body.zipcode || rent.address.zipcode,
      'city': req.body.city || rent.address.city,
      'country': req.body.country || rent.address.country};

    var characteristics = {'price': req.body.price || rent.characteristics.price,
      'area': req.body.area || rent.characteristics.area,
      'rooms': req.body.rooms || rent.characteristics.rooms,
      'bedrooms': req.body.bedrooms || rent.characteristics.bedrooms};

    sale.state = req.body.state || sale.state;
    sale.type = req.body.type || sale.type;
    sale.address = address || sale.adress;
    sale.characteristics = characteristics || sale.characteristics;

    if ( typeof req.body.detail_name !== 'undefined' && req.body.detail_name )
      var detail = {'name': req.body.detail_name,
        'more': req.body.detail_more}
      sale.details.push(detail);

    sale.save(function(err) {
      if (err)
        res.json(err);
      res.json(sale);
    });
  });
});

/* DELETE sale. */
router.delete('/:sale_id', functions.middleware, function(req, res, next) {
  Sale.findByIdAndRemove(req.params.sale_id, function(err, sale) {
    if (err)
      res.json(err);
    res.json(sale);
  });
});

module.exports = router;
