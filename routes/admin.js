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
    Music  = require('../models/music'),
    Artist  = require('../models/artist');

/* router.get('/', function(req,res){
    Album.find({}, function(err, allAlbum){
        if(err){
            console.log(err);
        }else{
            res.render('albums/index.ejs', {album: allAlbum}); 
        }
    });
    
}); */



router.get('/', middleware.isLoggedIn, function(req,res){
    res.render('admin/index.ejs');
});

router.get('/addmusic', middleware.isLoggedIn, function(req,res){
    res.render('admin/addmu.ejs');
});

router.post('/' , middleware.isLoggedIn, upload.single('image'),function(req,res){
    req.body.music.image = '/upload/' + req.file.filename;
    req.body.music.author = {
        id: req.user._id,
        username: req.user.username
    };
    // var newCollection = {name:name , image:image ,author: author};
    Music.create(req.body.music, function(err, newlyCreate){
        if(err){
            req.flash('success','Your music is created.');
            console.log(err);
        } else {
            res.redirect('/admin');
        }
    });
    
});



router.get('/:id' , function (req,res){
    Music.find({ name:req.params.id }, function(err,foundMusic){
        if(err) {
            console.log(err);
        } else {
            res.render('song.ejs', { music: foundMusic, artist: artist })
        }
    });
});


function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports  = router;
