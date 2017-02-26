var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    User        = require("./models/user"),
    Score       = require("./models/scores"),
    Quiz        = require("./models/quiz"),
    seedDB      = require("./seed");
    
    //requiring routes
var scoreRoutes    = require("./routes/scores"),
    quizRoutes     = require("./routes/quiz"),
    indexRoutes    = require("./routes/index"),
    userRoutes     = require("./routes/users");
    
// mongoose.connect("mongodb://localhost/dynamic_quiz");
mongoose.connect("mongodb://tim:grateful87@ds161159.mlab.com:61159/dynamic_quiz");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
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

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/quizzes", quizRoutes);
app.use("/quizzes/:id/scores", scoreRoutes);
app.use("/users", userRoutes);


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server started");
});