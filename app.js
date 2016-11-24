var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds"),
    cookieParser = require("cookie-parser");
    

//requiring routes
var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    indexRoutes          = require("./routes/index");
    
console.log(process.env.DATABASEURL);

mongoose.connect(process.env.DATABASEURL);

// mongoose.connect("mongodb://localhost/yelp_camp");
// mongoose.connect("mongodb://Wozacosta:AccidentProne1453@ds159377.mlab.com:59377/yelpcampdb");


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.use(function(req, res, next){
   console.log(req.get("Referrer"));
   next();
});
// seedDB();


//COOKIES
app.use(cookieParser()); // have to use before session

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Rusty wins so he's not cute",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//MIDDLEWARE
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.message_error = req.flash("error");
    res.locals.message_success = req.flash("success");
    next();
});

//pass in path to view
app.use(function(req, res, next) {
  res.locals.current_path = req.path;
  next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp server has started !");
});