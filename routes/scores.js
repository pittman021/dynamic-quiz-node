var express = require("express");
var router = express.Router({mergeParams:true});
var Score = require("../models/scores");
var Quiz = require("../models/quiz");

// Save your score /
router.post("/", function(req ,res) {
    // Lookup Quiz // 
    Quiz.findById(req.params.id, function(err , quiz) {
        if(err) {
            console.log(err);
        } else {
            Score.create(req.body, function(err, newScore) {
                    if(err) {
                        console.log(err);
                    } else {
                        // comparing quiz choice to correct answer to get percentage // 
                        var result = "";
                            if (req.body.choice === quiz.correctAnswer) {
                              result = 1;
                            } else {
                                result = 0;
                            }
                        newScore.score = result;
                        newScore.save();
                        quiz.scores.push(newScore);
                        quiz.save();
                        req.flash("success", "Score Submitted");
                        res.redirect("/quizzes/" + req.params.id);
                    }
            });
        }    
    });
});

router.get("/", function (req, res) {
    Quiz.findById(req.params.id).populate("scores").exec(function(err, foundQuiz) {
        if(err) {
            console.log(err);
        } else {
            var data = [];
            foundQuiz.scores.forEach(function(score) {
                data.push(score["score"]);
            });
            res.send(data);
        }
    });
});


module.exports = router; 