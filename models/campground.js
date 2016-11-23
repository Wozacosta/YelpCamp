var mongoose = require("mongoose");

// Schema setup
var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   mapPlace: String,
   free: {type: Boolean, default: "false"},
   shower: {type: Boolean, default: "false"},
   legal:{type: Boolean, default: "false"},
   fire: {type: Boolean, default: "false"},
   author:{
     id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
     } ,
     username: String
   },
   comments: [
       {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Comment"
       }
       ]
});

// Compile that into a model
module.exports = mongoose.model("Campground", campgroundSchema);
