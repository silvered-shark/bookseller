var express = require('express');
var router = express.Router();

// defining all routes
// TODO: setting patch request for Products
var Product = require('../models/product');



var User = require('../models/user');


//TODO: add winston logging for every database operation


const getAll = function (req, res, next) {

    Product.find({}, function (err, Products) {
        if (err)
            throw err;

        res.json(Products);
        res.end();
        next();

    });

};


const getByName = function (req, res, next) {

    Product.find({ name : req.params.Productname}, function (err, Product) {
        if(err)
            throw err;
        res.json(Product);
        next();
    })

};


addOne = function (req, res, next) {

    var Product = new Product();

    res.json({"recieve" :req.body.name});
    var Product = new Product();



    Product.name = req.body.name;
    Product.expectedRate = req.body.expectedRate;
    Product.type = req.body.type;

    Product.save(function(err) {

        if(err)
            throw err;
        res.send("Created user");
        res.json(Product);

    })


}



const deleteByName = function (req, res, next) {

    Product.remove({ name : req.params.Productname}, function (err, data) {
        if (err)
            throw err;
        res.json(data);
        next();
    })
}


const updateByName = function(req, res ,next) {

    Product.findOne({ name : req.params.Productname }, function (err, Product) {

        if (err)
            throw err;

        Product.name = req.body.name;
        Product.expectedRate = req.body.expectedRate;
        Product.type = req.body.type;

        Product.save(function(err) {

            if(err)
                throw err;
            res.send("Updated Product");
            res.json(Product);
            next();

        })

    })
}

//TODO : Check these special

const getAllSellers = function (req, res, next) {

    var sellingProductInfo = [];
    Product.findOne({ name : req.params.Productname }, function(err, Product) {

        if(err)
            throw err;

        var returnObject = {};
        Product.sellingInfo.map( function (SellingInfo) {
            returnObject.postedDate = SellingInfo.postedDate;

            SellingInfo.populate('seller').exec( function (err, Info) {

                returnObject.name = Info.seller.name;
                returnObject.email = Info.seller.email;
                returnObject.mobile = Info.seller.mobile;
            })

            sellingProductInfo.unshift(returnObject);
        })
    })

    return sellingProductInfo;

}


const addSellerByProduct = function (req, res, next) {

    Product.findOne({ name: req.params.Productname }, function (err, Product) {

        if (err)
            throw err;


        var SellingProductInfo = {
            postedDate : Date.now(),
            seller : user._id
        };

        Product.unshift(SellingProductInfo);
        Product.save(function (err) {
            if (err1)
                throw err1;
        });
    });

    res.json(SellingProductInfo);
    next();

};



const getSeller = function (req, res, next) {

    Product.findOne( {name : req.params.Productname }, function (err, Product) {

        if (err)
            throw err;

        var sellerInfo = Product.sellingInfo.filter( function (SellingInfo) {
            if (SellingInfo.seller._id == req.params.sellerId)
                return SellingInfo;
        })

        var returnInfo = {};
        returnInfo.postedDate = sellerInfo.postedDate;

        sellerInfo.populate('seller').exec( function (err, Info) {

            returnInfo.name = Info.seller.name;
            returnInfo.email = Info.seller.email;
            returnInfo.mobile = Info.seller.mobile;
        })

        return returnInfo;

    })

}



const deleteByProduct = function (req, res, next) {

    Product.findOne( {name : reqparams.Productname}, function(err, Product) {
        var SellingInfo = Product.sellingInfo.filter( function(Info) {
            if(Info.seller._id != req.params,sellerId)
                return Info
        })

        Product.sellingInfo = SellingInfo;
        Product.save(function (err) {
            if(err)
                throw err;
        })

    })

}

router.route('/')
    .get(getAll)
    .post(function (req, res, next) {



        var addProduct = new Product();


        addProduct.name = req.body.name;
        addProduct.expectedRate = req.body.expectedRate;
        addProduct.type = req.body.type;

        addProduct.save(function(err) {

            if(err)
                throw err;

        })
        res.send("Created user");

        next();

    })
    
    
router.route('/')
    .get(getAll)
    .post(addOne);

router.route('/{Productname}')
    .get(getByName)
    .delete(deleteByName)
    .put(updateByName);

router.route('/{Productname}/sellers')
    .get(getAllSellers)
    .post(addSellerByProduct);

router.route('/{Productname}/sellers/{sellerId}')
    .get(getSeller)
    .delete(deleteByProduct);

module.exports = router;
