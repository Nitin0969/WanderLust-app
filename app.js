const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const MONGO_URl = "mongodb://127.0.0.1:27017/wanderlust";
const methodovverrde = require("method-override");
const path = require("path");
const ejsMate = require("ejs-mate");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodovverrde("_method"));
app.engine('ejs',ejsMate);

app.use(express.static(path.join(__dirname,"/public")))

main()
.then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
});
async function main(){
   await mongoose.connect(MONGO_URl);
}
app.get("/",(req,res)=>{
    res.render("listings/home.ejs");
})
// app.get("/testlistening",async(req,res)=>{
//     let samplelist = new Listing({
//         title : "My Home",
//         description:"my sweet home",
//         image:"",
//         price:1000000,
//         location:"Pinjore",
//         country:"India",

//     });
//     await samplelist.save();
//     console.log("sample was saved");
//     console.log(samplelist);
//     res.send("succesfull testing");

// });

// index route
app.get("/listings",async(req,res)=>{
  const alllistning =  await Listing.find({});
  res.render("listings/index.ejs",{alllistning});

})
// new route
app.get("/listings/new",async(req,res)=>{
    res.render("listings/new.ejs");
})

// read to show all data
app.get("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
})

// create
app.post("/listings",async(req,res)=>{
    // let {title,description,image,price,location,country} = req.body;
   const newlisting =  new Listing(req.body.listing);
  await newlisting.save();
  res.redirect("/listings");
    
})
// edit route
app.get("/listings/:id/edit",async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
})
// update route
app.put("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
res.redirect(`/listings/${id}`);
})
// delete route
app.delete("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    let deletedlisting = await Listing.findByIdAndDelete(id);
    console.log(deletedlisting);
    res.redirect("/listings");
})
app.listen(8080,()=>{
    console.log("Server is listenining to port 8080");
});
