var mongoose    = require("mongoose");
var Campground  = require("./models/campground");
var Comment     = require("./models/comment");
var data = [
    {
        name: "Cloud's rest",
        image: "https://farm4.staticflickr.com/3297/3518227895_339a010a78.jpg",
        description: "rem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas rutrum lorem non ipsum vestibulum, sit amet imperdiet lacus iaculis. Vivamus a massa sed lorem auctor blandit sit amet et velit. Suspendisse sodales risus vitae dolor lobortis lacinia. Proin et luctus leo. Sed dapibus, est consequat molestie tristique, orci ligula iaculis libero, at aliquam mi ante eget enim. Curabitur efficitur, lacus eu consequat pretium, urna elit aliquam ex, a sollicitudin neque erat nec ex. Quisque placerat blandit aliquet. Curabitur mollis viverra dolor vel interdum. Donec aliquam leo nisi, nec interdum nisi finibus a. Nunc augue leo, aliquet at turpis et, tristique semper lacus."
    },
    {
        name: "Lively prairie",
        image: "https://farm3.staticflickr.com/2524/3875579827_d74d424902.jpg",
        description: "Etiam eget leo sollicitudin sem sollicitudin sodales. Donec a lectus condimentum, aliquet quam vel, tempor tellus. Nullam facilisis ultrices neque. Donec molestie enim vitae commodo scelerisque. Vivamus at massa vestibulum, dapibus tortor in, pharetra tellus. Sed scelerisque, leo ut consequat congue, nulla dolor consectetur risus, sit amet pretium erat nibh vel tortor. Nam ullamcorper, nulla vel vulputate tempus, sapien metus pulvinar lorem, sit amet sodales tortor ante eu enim. Praesent non dolor ut eros sodales suscipit. Vivamus vel ex sed ipsum pharetra ornare quis ac tortor. Aenean id vulputate tellus. Cras eleifend, lacus sit amet iaculis sollicitudin, enim ipsum ornare risus, in accumsan nisl elit id nunc. Curabitur volutpat quis erat eget dapibus. Maecenas felis nunc, euismod a semper id, egestas ut ligula. Etiam ac nulla sed sapien bibendum varius eu vitae sapien. Praesent dictum tempus velit eu consectetur"
    },
    {
        name: "Vonhooten marsh",
        image: "https://farm3.staticflickr.com/2315/3625837878_044be7aa1f.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse euismod blandit interdum. Pellentesque hendrerit nulla magna, quis porta magna sagittis nec. Pellentesque a tempor urna, ac convallis ante. Cras quis sodales eros. Mauris sollicitudin urna at nunc tempus tempor. Etiam at dui ornare, tincidunt elit non, tincidunt metus. Fusce lorem magna, dignissim sed sodales non, rutrum at eros. Proin suscipit sem eget risus mattis, id condimentum dolor lobortis. Fusce non eleifend lectus. Nulla eu turpis efficitur, pharetra enim at, efficitur leo"
    }
];

function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
       if (err){
           console.log(err);
       }
       else{
       console.log("removed campgrounds !"); 
       //Add a few camproungs
            data.forEach(function(seed){
               Campground.create(seed, function(err, campground){
                   if (err){
                       console.log(err);
                   }else{
                       console.log("added a campground");
                       
                       // create a comment
                       Comment.create({
                           text: "This place is great but I wish there was Internet",
                           author: "Homer"
                       }, function(err, comment){
                           if (err){
                               console.log(err);
                           }else{
                               campground.comments.push(comment);
                               campground.save();
                               console.log("created new comment");
                           }
                       });
                   }
               }) ;
            }); // for each
       } //--- else
    }); //--- campground callback
}

module.exports = seedDB;