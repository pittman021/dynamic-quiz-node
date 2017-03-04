var express = require("express");
var router = express.Router();
var Quiz = require("../models/quiz");
var middleware = require("../middleware/index");


// QUIZ ROUTES //

// View all Quizzes // 
router.get("/", middleware.isLoggedIn, function(req, res) {
    Quiz.find({}, function(err, quiz){
        if(err) {
            console.log(err);
        } else {
            res.render("quizzes/index", {quiz:quiz, currentUser: req.user, message: req.flash("error")});
        }
    });
});

// Create a quiz // 
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("quizzes/new");
});

// Create a new quiz and store to DB // 
router.post("/new", middleware.isLoggedIn, function(req,res) {
    var title = req.body.title;
    var question = req.body.question;
    var answer = req.body.answer;
    var choices = [];
    var author = {
        id: req.user._id,
        username: req.user.username
    };

     // Loop through x number of choices //  
    for (var i = 0; i < req.body.choice.length; i++) {
        choices.push(req.body.choice[i]);
    }
    var newQuiz = {title:title, question:question, choices:choices, correctAnswer:answer, author:author};
    
    Quiz.create(newQuiz, function(err, newlyCreated) {
        if(err) {
    } else {
        req.flash("success", "Quiz Created!");
        res.redirect("/quizzes/:id");
    }
    });

});

// SHOW QUIZ // 
router.get("/:id", function(req, res) {
    Quiz.findById(req.params.id, function(err, foundQuiz) {
        if(err) {
            console.log(err); 
        } else {
            res.render("quizzes/show", {quiz: foundQuiz});
        }
    });
});


router.delete("/:id", middleware.isLoggedIn, function(req, res) {
    // find by id and remove
    Quiz.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            res.redirect("back");
    }  else {
        req.flash("success", "Quiz deleted!");
        res.redirect("/users/" + req.user.id );
    }
});
});


module.exports = router;