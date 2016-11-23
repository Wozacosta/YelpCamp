var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware"); // automatically require /middleware/index.js -> it's supposed to be the main file

// INDEX  --- Display a list of all campgrounds
router.get("/", function(req, res){
    console.log(req.user);
    //Get all campgrounds from DB
    Campground.find({}, function(err, allcampgrounds){
       if (err){
           console.log(err);
       } else{
        //   console.log(allcampgrounds);
           res.render("campgrounds/index", {campgrounds: allcampgrounds});
       }
    });
    // 
});

// CREATE --- Add a new campground to the DB
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var mapPlace = req.body.mapPlace;
    // console.log("MAP PLACE =|" + mapPlace);
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, image: image, description: description, mapPlace: mapPlace, author: author};
   Campground.create(newCampground, function(err, newlyCreated){
       if (err){
           console.log(err);
       }else{
           res.redirect("/campgrounds");
       }
   });
});

// NEW --- Display a form to make a new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("campgrounds/new"); 
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    var id = req.params.id;
    Campground.findById(id).populate("comments").exec(function(err, foundCampground){
        if (err){
            console.log(err);
        }else{
            //console.log(foundCampground);
             res.render("campgrounds/show", {campground: foundCampground}); 
        }
    });
});

// EDIT - shows form to edit
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground}); 
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    if (!req.body.campground.legal){
        req.body.campground.legal = "false";
    }
    if (!req.body.campground.free){
        req.body.campground.free = "false";
    }
    if (!req.body.campground.shower){
        req.body.campground.shower = "false";
    }
    if (!req.body.campground.fire){
        req.body.campground.fire = "false";
    }
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, {upsert: true, new: true}, function(err, updatedCampground){
                if (err){
                    console.log("Error updating");
                    console.log(err);
                    res.redirect("/campgrounds");
                }else{
                    res.redirect("/campgrounds/" + req.params.id);
                }
    });  
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
      if (err){
          res.redirect("/campgrounds");
      } else{
          res.redirect("/campgrounds")
      }
   });
});


module.exports = router;