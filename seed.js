var mongoose = require("mongoose");
var User = require("./models/user");
var Quiz = require("./models/quiz");
var Score = require("./models/scores");

function seedDB() {
    // Remove all quizzes
    Quiz.remove({},function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log('quizzes removed');
        }
    });
    
    Score.remove({},function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log('scores removed');
      }
    });
    
    // Add 3 generic quizzes //
 var newQuiz = new Quiz({
    title: "Dynamic Quiz 1",
    question: "Question 1",
    choices: ["Option1", "Option2", "Option3"],
    correctAnswer: "Option2",
    scores: []

});
newQuiz.save(function(err,quiz) {
    if(err) {
        console.log(err);
        } else {
            console.log('quiz 1 added');
        }
});

var newQuiz2 = new Quiz({
    title: "Civil War Quiz",
    question: "Who won the civil war?",
    choices: ["America", "Britian", "Abraham Lincoln"],
    correctAnswer: "Abraham Lincoln",
    scores: []
});
newQuiz2.save(function(err,quiz) {
    if(err) {
        console.log(err);
        } else {
            console.log('quiz 2 added');
        }
});

var newQuiz3 = new Quiz({
    title: "FB Barcelona Quiz",
    question: "How many champion leagues has FCB won?",
    choices: ["1", "7", "9"],
    correctAnswer: "9",
    scores: []
});

newQuiz3.save(function(err,quiz) {
    if(err) {
        console.log(err);
        } else {
            console.log('quiz 3 added');
        }
});

}

module.exports = seedDB;

