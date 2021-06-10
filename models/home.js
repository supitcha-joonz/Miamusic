var mongoose = require('mongoose');

var homeSchema = new mongoose.Schema({
    image: String,
    song: String,
    picture: String,
    song1: String,
    picture1: String,
    song2: String,
    picture2: String,
    namealb: String,
    ipcalb: String,
    namealb1: String,
    ipcalb1: String,
    namealb2: String,
    ipcalb2: String,
    art: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    }
});

module.exports = mongoose.model('Home', homeSchema);