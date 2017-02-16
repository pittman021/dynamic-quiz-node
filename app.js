var express     = require("express"),
    app         = express(),
    flash       = require('connect-flash'),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    User        = require("./models/user.js"),
    seedDB      = require("./seed");
    

mongoose.connect("mongodb://localhost/dynamic_quiz");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
// seedDB();

// FLASH //
  app.use(express.cookieParser('keyboard cat'));
  app.use(express.session({ cookie: { maxAge: 60000 }}));
  app.use(flash());

// PASSPORT CONFIG //
app.use(require("express-session")({
    secret:"Tim loves tacos",
    resave: false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use( new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// ------ ROUTES --------- // 

// INDEX AND LOGIN ROUTES 
app.get("/", function(req, res) {
    res.render("home.ejs");
});

// Show the login page // 
app.get("/login", function(req, res) {
    res.render("login"); 
});

app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/quiz", 
        failureRedirect:"/login",
 
    }), function(req, res) {
});


// SHOW THE SIGNUP PAGE // 
app.get("/signup", function(req, res) {
    res.render("signup");
});

// HANDLE THE LOGIN LOGIC AND LOGGING-IN // 
app.post("/signup", function(req, res) {
    var newUser = new User({username:req.body.username});
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render("signup");
        } 
        passport.authenticate("local")(req,res,function() {
        res.redirect("quiz");
            });
    });
});

// Logout // 
app.get("/logout", function(req, res) {
    req.logout();
    res.redirect('/');
});

app.get("/quiz", function(req, res) {
    res.render("quiz");
});

app.get("*", function(req, res) {
    res.send("you are a star!");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server started");
});