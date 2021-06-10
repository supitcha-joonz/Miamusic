var mongoose = require('mongoose');

var musicSchema = new mongoose.Schema({
    name: String,
    song: String,
    image: String,
    lysics: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

module.exports = mongoose.model('Music', musicSchema);