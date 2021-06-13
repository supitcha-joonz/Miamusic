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



router.get('/addmusic', middleware.isLoggedIn, function(req,res){
    res.render('admin/addmu.ejs');
});

router.get('/' , middleware.isLoggedIn, function (req, res) {
    Music.find({}, function (err, allMusic) {
        if (err) {
            console.log(err);
        } else {
            res.render('admin/index.ejs', { music: allMusic });
        }
    });
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

/* router.post('/' , middleware.isLoggedIn ,function(req,res){
    Music.create(req.body.music, function(err, newlyCreate){
        if(err){
            req.flash('success','Your music is created.');
            console.log(err);
        } else {
            res.redirect('/admin');
        }
    });
}); */




router.get('/:id' , function(req,res){
    Music.findById(req.params.id).populate('comments').exec(function(err, foundMusic){
        if(err){
            console.log(err);
        } else {
            res.render('song.ejs', {music: foundMusic});
        }
    });
});

router.get('/:id/editmu' , middleware.checkMusicOwner, function(req,res){
    Music.findById(req.params.id, function(err, foundMusic){
        if(err){
            console.log(err);
        }else {
            res.render('admin/editmu.ejs' , {music: foundMusic});
        }
    });
});

router.put('/:id', upload.single('image'), function(req,res){
    if(req.file){
        req.body.music.image = '/upload/' + req.file.filename;
    }
    Music.findByIdAndUpdate(req.params.id, req.body.music, function(err, updatedMusic){
        if(err){
            res.redirect('/artist');
        }else{
            res.redirect('/artist');
        }
    });
});

router.delete('/:id', function (req, res) {
    Music.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            // console.log(err);
            res.redirect('/admin/');
        } else {
            res.redirect('/admin/');
        }
    });
});




function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports  = router;
