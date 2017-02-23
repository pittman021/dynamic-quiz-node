var express = require("express");
var router = express.Router();
var passport = require("passport");
var Quiz = require("../models/quiz");

router.get("/:id", function(req, res) {
    Quiz.find({'author.id':req.params.id},function(err, foundQuiz){
        if(err) {
            console.log(err);
        } else {
            res.render("users/show", {quizzes:foundQuiz});
        }
    });
});

module.exports = router;
