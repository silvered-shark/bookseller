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

const facebookSchema = new Schema ({
   id : string,
   token : string,
   email : string,
   name : string
});



const User = mongoose.model('User', userSchema);
const facebook = mongoose.model('facebook', facebookSchema);

exports.module = User;