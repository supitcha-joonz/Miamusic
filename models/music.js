var mongoose = require('mongoose');

var musicSchema = new mongoose.Schema({
    name: String,
    song: String,
    lysics: String,
});

module.exports = mongoose.model('Music', musicSchema);