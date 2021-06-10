var express = require('express'),
    router  = express.Router({mergeParams: true}),
    middleware = require('../middleware'),
    Artist = require('../models/artist'),
    Album      = require('../models/album'),
    Comment    = require('../models/comment');

router.get('/new', middleware.isLoggedIn, function(req, res){
    Artist.findById(req.params.id, function(err, foundArtist){
        if(err){
            console.log(err);
        } else {
            res.render("comments/newart.ejs", {artist: foundArtist});
        }
    });    
});

router.post('/', middleware.isLoggedIn, function(req, res){
    Artist.findById(req.params.id, function(err, foundArtist){
        if(err){
            console.log(err);
            res.redirect('/artist');
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err) {
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    foundArtist.comments.push(comment);
                    foundArtist.save();
                    req.flash('success','Your comment is added.');
                    res.redirect('/artist/'+ foundArtist._id + '/song');
                }
            });
        }
    });
});


router.get('/:comment_id/edit', middleware.checkCommentOwner, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect('back');
        } else {
            res.render('comments/editart.ejs', {collection_id: req.params.id, comment: foundComment});
        }
    });
});

router.put('/:comment_id', middleware.checkCommentOwner, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect('back');
        } else {
            res.redirect('/collection/'+ req.params.id + '/song');
        }
    });
});

router.delete('/:comment_id', middleware.checkCommentOwner, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect('back');
        } else {
            req.flash('success','Your comment is deleted.');
            res.redirect('/collection/' + req.params.id + '/song');
        }
    });
});

module.exports = router;
