const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name : String,
    email : String,
    mobile  : Number,
    book : [{type : Schema.types.ObjectId, ref: 'Book'}],
    gender  : {enum :['Male', 'Female']},
    product : [{type : Schema.types.ObjectId, ref :'Product'}]
});

const User = mongoose.model('User', userSchema);