const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema ({

    type : String,
    expectedRate : Number,
    sellingInfo : [sellingInfoSchema]

});


const sellingInfoSchema = new Schema({

    postedDate : { type : Date, index : true},
    seller : { type : Schema.type.ObjectId, ref : "user"}

});


//check availability of product
productSchema.method.isAvailable = function(callback) {
    if(this.sellingInfo.length)
        callback(false)
    else
        callback(true)
}


const Product = mongoose.model('Product', productSchema);
exports.module = Product;