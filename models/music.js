var mongoose = require('mongoose');

var musicSchema = new mongoose.Schema({
    name: String,
    song: String,
    image: String,
    lysics: String,
});

module.exports = mongoose.model('Music', musicSchema);