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
            res.render("quizzes/index", {quiz:quiz, currentUser: req.user});
        }
    });
});

// Create a quiz // 
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("quizzes/new");
});

// create a new quiz and store to DB // 
router.post("/new", middleware.isLoggedIn, function(req,res) {
    console.log(req.user._id);
    var title = req.body.title;
    var question = req.body.question;
    var answer = req.body.answer;
    var choices = [req.body.choice1, req.body.choice2, req.body.choice3];
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    
    var newQuiz = {title:title, question:question, choices:choices, correctAnswer:answer, author: author};
    
    Quiz.create(newQuiz, function(err, newlyCreated) {
        if(err) {
    } else {
        console.log(newlyCreated);
        console.log('quiz created!');
        res.redirect("/quizzes");
    }
    });

});

// SHOW QUIZ // 
router.get("/:id", middleware.isLoggedIn, function(req, res) {
    Quiz.findById(req.params.id).populate("scores").exec(function(err, foundQuiz) {
        if(err) {
            console.log(err); 
        } else {
            res.render("quizzes/show", {quiz: foundQuiz});
        }
    });
});


router.delete("/:id", function(req, res) {
    // find by id and remove
    Quiz.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            res.redirect("back");
    }  else {
        console.log("quiz deleted");
        res.redirect("/users/" + req.user.id );
    }
});
});


module.exports = router;