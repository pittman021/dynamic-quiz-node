var express     = require("express"),
    app         = express(),
    flash       = require('connect-flash'),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    User        = require("./models/user"),
    Score       = require("./models/scores"),
    Quiz        = require("./models/quiz"),
    seedDB      = require("./seed");
    
    //requiring routes
var scoreRoutes    = require("./routes/scores"),
    quizRoutes     = require("./routes/quiz"),
    indexRoutes    = require("./routes/index");
    
mongoose.connect("mongodb://localhost/dynamic_quiz");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// FLASH //
//   app.use(express.cookieParser('keyboard cat'));
//   app.use(express.session({ cookie: { maxAge: 60000 }}));
//   app.use(flash());

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

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

app.use("/", indexRoutes);
app.use("/quizzes", quizRoutes);
app.use("/quizzes/:id/scores", scoreRoutes);



app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server started");
});