const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var con_book = mongoose.createConnection("localhost:27017/bookseller");
var mongoosePaginate = require('mongoose-paginate');


const sellingInfoSchema = new Schema({

    postedDate : { type : Date, default : Date.now() },
    expPrice: Number,
    comment : String,
    mobile : Number,
    seller : { type : Schema.Types.ObjectId, ref : "user"}

});



const bookSchema = new Schema({

    name : { type : String},
    description: String,
    type : String,
    sellingInfo : [sellingInfoSchema]

});

bookSchema.plugin(mongoosePaginate);



//check availability
bookSchema.method.isAvailable = function(callback) {
    if(this.sellingInfo.length)
        callback(false)
    else
        callback(true)

}


// method to find similar Books
bookSchema.method.findSimilar = function (callback2) {
    var similarBooks = [];

    this.model('Book').find({type : this.type }, function(err, books) {

        if(err) {
           callback2(err);
        }

        books.map(function(book){
            var oneBook = { name : book.name, available : book.available };
            similarBooks.unshift(oneBook);
         });

        return callback2(similarBooks);

    })

}

const Book = con_book.model('Book', bookSchema);
module.exports = Book;