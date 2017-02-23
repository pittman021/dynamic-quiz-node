var mongoose = require("mongoose");

var quizSchema = new mongoose.Schema({
    title: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    question: String, 
    choices: [],
    correctAnswer: String,
    scores: [ 
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "Score"
        }
    ]
});

module.exports = mongoose.model("Quiz",quizSchema);