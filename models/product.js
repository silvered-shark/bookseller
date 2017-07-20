const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema ({
    type : String,
    expectedRate : Number,
    available : Boolean,
    postedDate : Date.now(),
    seller : [{type : Schema.ObjectId, ref : 'User'}]
});

const Product = mongoose.model('Product', productSchema);