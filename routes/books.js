var express = require('express');
var router = express.Router();

// defining all routes
// TODO: setting patch request for books
var Book = require('../models/book');



var User = require('../models/user');


//TODO: add winston logging for every database operation

const getBooksByOptions = function (req, res, next) {


     const bookcount = 6;
     var option = req.query.type ? { type :  req.query.type } : {};
     var count =  req.query.count || bookcount;

     Book.paginate( option, { offset : count-6 , limit : 6}, function (err, books) {
        if (err)
            throw err;

           if (count == 6)
               res.render('books', books.docs);

           else
               res.send(books);


     });

}


const getByName = function (req, res, next) {

    Book.find({ name : req.params.bookname}, function (err, book) {
        if(err)
            throw err;
        res.json(book);
        next();
    })

};


const addOne = function (req, res, next) {

    var newBook = new Book();

    newBook.name = req.body.name;
    newBook.description = req.body.description;
    newBook.type = req.body.type;
      console.log(newBook);
    newBook.save(function(err) {

        if(err)
            throw err;
    });
    res.redirect('/');

}



const deleteByName = function (req, res, next) {

    Book.remove({ name : req.params.bookname}, function (err, data) {
        if (err)
            throw err;
        res.json(data);
        next();
    })
}


const updateByName = function(req, res ,next) {

    Book.findOne({ name : req.params.bookname }, function (err, Book) {

        if (err)
            throw err;

        Book.name = req.body.name;
        Book.expectedRate = req.body.expectedRate;
        Book.type = req.body.type;

        Book.save(function(err) {

            if(err)
                throw err;
            res.send("Updated Book");
            res.json(Book);
            next();

        })

    })
}

//TODO : Check these special

const getAllSellers = function (req, res, next) {

    var sellingBookInfo = [];
    Book.findOne({ name : req.params.bookname }, function(err, book) {

        if(err)
            throw err;

        var returnObject = {};
        book.sellingInfo.map( function (SellingInfo) {
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


const addSellerByBook = function (req, res, next) {

    Book.findOne({ name: req.param('bookname') }, function(err, book) {

        if (err)
            throw err;

        var SellingBookInfo = {

            postedDate : Date.now(),
            //seller : res.session.user,
            mobile : req.body.mobile,
            comment : req.body.comment,
            expectedPrice : req.body.expectedRate
        };

        book.sellingInfo.push(SellingBookInfo);
        console.log(book);
        book.save(function (err1) {
            if (err1)
                throw err1;
            res.send('saved content');
        });
    });

};



const getSeller = function (req, res, next) {

    Book.findOne( {name : req.params.bookname }, function (err, book) {

        if (err)
            throw err;

        var sellerInfo = book.sellingInfo.filter( function (SellingInfo) {
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



const deleteByBook = function (req, res, next) {

    Book.findOne( {name : reqparams.bookname}, function(err, book) {
        var SellingInfo = book.sellingInfo.filter( function(Info) {
            if(Info.seller._id != req.params,sellerId)
                return Info
        })

        Book.sellingInfo = SellingInfo;
        Book.save(function (err) {
            if(err)
                throw err;
        })

    })

}

router.route('/')
    .get(getBooksByOptions)
    .post(addOne);

router.route('/new')
    .get(function(req, res) {
        var options = {};
        options.title = 'Book || Sell';
        res.render('sellbook',options);
    })

router.route('/:bookname')
    .get(getByName)
    .delete(deleteByName)
    .put(updateByName);

router.route('/:bookname/sellers')
     .get(getAllSellers)
     .post(addSellerByBook);

router.route('/:bookname/sellers/:sellerId')
     .get(getSeller)
     .delete(deleteByBook);



module.exports = router;


function isLoggedIn(req, res, next) {
    if(req.isAuthenticated())
    {

        return next();
    }
    // flash messages
    console.log('LogIn first');

}

