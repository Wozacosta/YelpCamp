var mongoose = require("mongoose");

// Schema setup
var commentSchema = new mongoose.Schema({
   text: String,
   author: {
      id:{
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username:   String
   }
});

// Compile that into a model
module.exports = mongoose.model("Comment", commentSchema);
