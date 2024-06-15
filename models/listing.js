const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title : {
        type:String,
        required:true,
    },
    description : String,
    image :{
        type :String,
        default:"https://tse3.mm.bing.net/th?id=OIP.CDHDsbMAWk9cNcM7qAmAqwHaEo&pid=Api&P=0&h=180",
        set:(v)=> v ==="" 
        ? "https://tse3.mm.bing.net/th?id=OIP.CDHDsbMAWk9cNcM7qAmAqwHaEo&pid=Api&P=0&h=180"
        :v,
    },
    price : Number,
    location:String,
    country:String,
});

const Listing = mongoose.model("listing",listingSchema);
module.exports = Listing;