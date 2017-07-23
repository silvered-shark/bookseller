const maongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({

    name : { type : String},
    expectedRate : Number,
    type : String,
    sellingInfo : [sellingInfoSchema]

});


const sellingInfoSchema = new Schema({

    postedDate : { type : Date, default : Date.now() },
    seller : { type : Schema.type.ObjectId, ref : "user"}

});



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

const Book = mongoose.model('Book', bookschema);
exports.module = Book;