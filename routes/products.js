var express = require('express');
var router = express.Router();

var express = require('express');
var router = express.Router();

// defining all routes
// TODO: setting patch request for product

var Product = require('../models/Product');


router.route('/')
    .get(getAll)
    .post(addOne)

router.route('/{productname}')
    .get(getByName)
    .delete(deleteByName)
    .put(updateByName)

router.route('/{productname}/sellers')
    .get(getAllSellers)
    .post(addSellerByProduct)

router.route('/{productname}/sellers/{sellerId}')
    .get(getSeller)
    .put(updateSellerByProduct)
    .delete(deleteByProduct)



getAll = function (req, res, next) {

    Product.find({}, function (err, products) {
        if (err)
            throw err;

        res.json(products);
        next();

    });

}


getByName = function (req, res, next) {

    Product.find({ name : Productname}, function (err, product) {
        if(err)
            throw err;
        res.json(product);
        next();
    })

}


addOne = function (req, res, next) {


}