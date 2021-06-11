var Artist     = require('../models/artist'),
    Album      = require('../models/album'),
    Comment    = require('../models/comment');

var middlewareObj = {};

middlewareObj.checkArtistOwner = function(req, res, next){
    if(req.isAuthenticated()){
        Artist.findById(req.params.id, function(err, foundArtist){
            if(err){
                req.flash('error','Artist not found!');
                res.redirect('back');
            } else {
                if(foundArtist.author.id.equals(req.user._id) || req.user.isadmin) {
                    next();
                } else {
                    req.flash('error','You do not have permission to do this action.');
                    res.redirect('back');
                }
            }
        });
    } else {
        req.flash('error','You need to sign in first!!');
        res.redirect('back');
    }
}

middlewareObj.checkAlbumOwner = function(req, res, next){
    if(req.isAuthenticated()){
        Album.findById(req.params.id, function(err, foundAlbum){
            if(err){
                req.flash('error','Album not found!');
                res.redirect('back');
            } else {
                if(foundAlbum.author.id.equals(req.user._id) || req.user.isadmin) {
                    next();
                } else {
                    req.flash('error','You do not have permission to do this action.');
                    res.redirect('back');
                }
            }
        });
    } else {
        req.flash('error','You need to sign in first!!');
        res.redirect('back');
    }
}

middlewareObj.checkCommentOwner = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                req.flash('error','Comment not found!');
                res.redirect('back');
            } else {
                if(foundComment.author.id.equals(req.user._id) || req.user.isadmin) {
                    next();
                } else {
                    req.flash('error','You do not have permission to do this action.');
                    res.redirect('back');
                }
            }
        });
    } else {
        req.flash('error','You need to sign in first!!');
        res.redirect('back');
    }
}



middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error','You need to sign in first!!');
    res.redirect('/login');
}

module.exports = middlewareObj;