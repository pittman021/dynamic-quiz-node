var mongoose = require("mongoose");

var scoreSchema = new mongoose.Schema({
    score: Number,
    author: {
        id: {
            type:mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
});

module.exports = mongoose.model("Score", scoreSchema);