var express = require('express');
var router = express.Router();
var Product = require('../models/book');
var User = require('../models/user');


//TODO: add winston logging for every database operation

const getProductByOptions = function (req, res, next) {


    const productcount = 6;
    var option = req.query.type ? { type :  req.query.type } : {};
    var count =  req.query.count || productcount;

    Product.paginate( option, { offset : count-6 , limit : 6}, function (err, products) {
        if (err)
            throw err;

        if (count == 6)
            res.render('products', products.docs);

        else
            res.send(products);


    });

}


const getByName = function (req, res, next) {

    Product.find({ name : req.params.productname}, function (err, product) {
        if(err)
            throw err;
        res.json(product);
        next();
    })

};


const addOne = function (req, res, next) {

    var newProduct = new Product();

    newProduct.name = req.body.name;
    newProduct.description = req.body.description;
    newProduct.type = req.body.type;
    console.log(newProduct);
    newProduct.save(function(err) {

        if(err)
            throw err;
    });
    res.redirect('/');

}



const deleteByName = function (req, res, next) {

    Product.remove({ name : req.params.productname}, function (err, data) {
        if (err)
            throw err;
        res.json(data);
        next();
    })
}


const updateByName = function(req, res ,next) {

    Book.findOne({ name : req.params.productname }, function (err, Book) {

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

    var sellingBookInfo = [];
    Product.findOne({ name : req.params.productname }, function(err, book) {

        if(err)
            throw err;

        var returnObject = {};
        product.sellingInfo.map( function (SellingInfo) {
            returnObject.postedDate = SellingInfo.postedDate;

            SellingInfo.populate('seller').exec( function (err, Info) {

                returnObject.name = Info.seller.name;
                returnObject.email = Info.seller.email;
                returnObject.mobile = Info.seller.mobile;
            })

            sellingBookInfo.unshift(returnObject);
        })
    })

    return sellingBookInfo;

}


const addSellerByProduct= function (req, res, next) {

    Product.findOne({ name: req.param('productname') }, function(err, product) {

        if (err)
            throw err;
        console.log(req.user);

        var SellingBookInfo = {

            postedDate : Date.now(),
            seller : req.user._id,
            mobile : req.body.mobile,
            comment : req.body.comment,
            expectedPrice : req.body.expectedRate
        };


        product.sellingInfo.push(SellingBookInfo);
        product.save(function (err1) {
            if (err1)
                throw err1;
        });

        User.findById({_id : req.user._id}, function (err, user) {

            if (err)
                return err;

            product.book.push( product._id);
            user.save( function (err) {
                if (err)
                    throw err;
                res.send('saved');
            })


        });

    });

};



const getSeller = function (req, res, next) {

    Product.findOne( {name : req.params.bookname }, function (err, book) {

        if (err)
            throw err;

        var sellerInfo = product.sellingInfo.filter( function (SellingInfo) {
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



const deleteByProduct= function (req, res, next) {

    Product.findOne( {name : reqparams.bookname}, function(err, product) {
        var SellingInfo = book.sellingInfo.filter( function(Info) {
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
    .get(getProductByOptions)
    .post(addOne);

router.route('/new')
    .get(function(req, res) {
        var options = {};
        options.title = 'Book || Sell';
        res.render('sellbook',options);
    });

router.route('/:bookname')
    .get(getByName)
    .delete(deleteByName)
    .put(updateByName);

router.route('/:bookname/sellers')
    .get(getAllSellers)
    .post(addSellerByProduct);

router.route('/:bookname/sellers/:sellerId')
    .get(getSeller)
    .delete(deleteByProduct);



module.exports = router;


function isLoggedIn(req, res, next) {
    if(req.isAuthenticated())
    {

        return next();
    }
    // flash messages
    console.log('LogIn first');

}

