var mongoose = require("mongoose");

var scoreSchema = new mongoose.Schema({
    score: Number,
});

module.exports = mongoose.model("Score", scoreSchema);