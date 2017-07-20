const maongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name : String,
    expectedRate : Number,
    available : Boolean,
    postedDate : Date.now(),
    seller : [{type : Schema.Types.ObjectId, ref: 'User'}]

});

const Book = mongoose.model('Book', bookschema);

exports.module = Book;