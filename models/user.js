const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var con_user = mongoose.createConnection("localhost:27017/bookseller");

const userSchema = new Schema({

    name : String,
    email : String,
    mobile  : Number,
    book : [{type : Schema.Types.ObjectId, ref: 'Book'}],
    gender  : String,
    product : [{type : Schema.Types.ObjectId, ref :'Product'}],
    facebook : {
        id: String,
        token: String
    }
});




const User = con_user.model('User', userSchema);

module.exports = User;