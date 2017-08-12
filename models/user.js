const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var con_user = mongoose.createConnection("localhost:27017/bookseller");

const userSchema = new Schema({

    name : String,
    email : String,
    mobile  : Number,
    picture : String,
    book : [{type : Schema.Types.ObjectId, ref: 'Book'}],
    product : [{type : Schema.Types.ObjectId, ref: 'Product'}],
    gender  : String,
    facebook : {
        id: String,
        token: String
    },
    google : {
        id : String,
        token : String
    }
});




const User = con_user.model('User', userSchema);

module.exports = User;