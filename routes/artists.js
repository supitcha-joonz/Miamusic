var express     = require('express'),
    /* router      = express.Router(), */
    router = express.Router({
        mergeParams: true
    });
    multer      = require('multer'),
    path        = require('path'),
    middleware  = require('../middleware'),
    storage = multer.diskStorage({
                destination: function(req, file, callback){
                    callback(null,'./public/upload/');
                },
                filename: function(req, file ,callback){
                    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
                }

            }),
    imageFilter = function(req,file,callback){
        if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
            return callback(new Error('Only JPG,JPEG,PNG and GIF image files are allowed!'), false);
        }
        callback(null, true);
    },
    upload  = multer({storage: storage, fileFilter: imageFilter}),
    music   = require('../models/music'),
    artist  = require('../models/artist');

/* router.get('/', function(req,res){
    Album.find({}, function(err, allAlbum){
        if(err){
            console.log(err);
        }else{
            res.render('albums/index.ejs', {album: allAlbum}); 
        }
    });
    
}); */

router.get("/", function(req, res){
    var noMatch = null;
    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
       
        Artist.find({name: regex}, function(err, allArtist){
           if(err){
               console.log(err);
           } else {
              if(allArtist.length < 1) {
                req.flash('error','Artist not found!');
                res.redirect('back');
              }
              res.render("artists/index",{artist:allArtist, noMatch: noMatch});
           }
        });
    } else {
        
        Artist.find({}, function(err, allArtist){
           if(err){
               console.log(err);
           } else {
              res.render("artists/index",{artist:allArtist, noMatch: noMatch});
           }
        });
    }
});

router.post('/' , middleware.isLoggedIn, upload.single('image'),function(req,res){
    req.body.artist.image = '/upload/' + req.file.filename;
    req.body.artist.author = {
        id: req.user._id,
        username: req.user.username
    };
    // var newCollection = {name:name , image:image ,author: author};
    Artist.create(req.body.artist, function(err, newlyCreate){
        if(err){
            req.flash('success','Your artist is created.');
            console.log(err);
        } else {
            res.redirect('/artist');
        }
    });
    
});

router.get('/:id', function (req,res) {
    Music.find({ name: req.params.id },function (err, foundMusic) {
        if(err){
            console.log(err);
        } else {
            res.render('song.ejs', { music: foundMusic, artist: artist})
        }
    });
});



router.get('/new', middleware.isLoggedIn, function(req,res){
    res.render('artists/new.ejs');
});

router.get('/:id' , function(req,res){
    Artist.findById(req.params.id).populate('comments').exec(function(err, foundArtist){
        if(err){
            console.log(err);
        } else {
            res.render('song.ejs', {artist: foundArtist});
        }
    });
});

router.get('/:id/edit' , middleware.checkArtistOwner, function(req,res){
    Artist.findById(req.params.id, function(err, foundArtist){
        if(err){
            console.log(err);
        }else {
            res.render('artists/edit.ejs' , {artist: foundArtist});
        }
    });
});

router.put('/:id', upload.single('image'), function(req,res){
    if(req.file){
        req.body.artist.image = '/upload/' + req.file.filename;
    }
    Artist.findByIdAndUpdate(req.params.id, req.body.artist, function(err, updatedartist){
        if(err){
            res.redirect('/artist/');
        }else{
            res.redirect('/artist/' + req.params.id);
        }
    });
});


router.delete('/:id' , middleware.checkArtistOwner, function(req,res){
   Artist.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/artist/');
        }else{
            req.flash('success','Your artist is deleted.');
            res.redirect('/artist/');
        }
    });
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports  = router;
