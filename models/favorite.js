var mongoose = require('mongoose');

var favoriteSchema = new mongoose.Schema({
    username: String,
    name: String,
    song: String,
    image: String,
});

module.exports = mongoose.model('Favorite', favoriteSchema);
