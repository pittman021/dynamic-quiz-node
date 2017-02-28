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
    console.log(req.body);
    var choices = [];
     // Loop through x number of choices //  
    for (var i = 0; i < req.body.choice.length; i++) {
        choices.push(req.body.choice[i]);
    }
    var newQuiz = {title:title, question:question, choices:choices, correctAnswer:answer};
    
    Quiz.create(newQuiz, function(err, newlyCreated) {
        if(err) {
    } else {
        console.log(newlyCreated);
        req.flash("success", "Quiz Created!");
        res.redirect("/quizzes");
    }
    });

});

// SHOW QUIZ // 
router.get("/:id", function(req, res) {
    Quiz.findById(req.params.id).populate("scores").exec(function(err, foundQuiz) {
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