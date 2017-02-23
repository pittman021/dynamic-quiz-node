var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");


router.get("/", function(req, res) {
    res.render("home");
});

router.get("/login", function(req, res) {
    res.render("login"); 
});

router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/quizzes",
        failureRedirect:"/login",
 
    }), function(req, res) {
});

// SHOW THE SIGNUP PAGE // 
router.get("/signup", function(req, res) {
    res.render("signup");
});

// HANDLE THE LOGIN LOGIC AND LOGGING-IN // 
router.post("/signup", function(req, res) {
    var newUser = new User({username:req.body.username});
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render("signup");
        } 
        passport.authenticate("local")(req,res,function() {
        res.redirect("/quizzes");
            });
    });
});

// Logout // 
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;