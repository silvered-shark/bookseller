const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var con_product = mongoose.createConnection("mongodb://sachin:123@ds153853.mlab.com:53853/bookseller");



const sellingInfoSchema = new Schema({

    postedDate : { type : Date, default : Date.now() },
    expPrice: Number,
    comment : String,
    mobile : Number,
    seller : { type : Schema.Types.ObjectId, ref : "user"}

});


const productSchema = new Schema ({

    name : { type : String},
    description: String,
    type : String,
    sellingInfo : [sellingInfoSchema]

});




//check availability of product
productSchema.method.isAvailable = function(callback) {
    if(this.sellingInfo.length)
        callback(false)
    else
        callback(true)
}


const Product = con_product.model('Product', productSchema);
module.exports = Product;