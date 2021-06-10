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
    Album  = require('../models/album');

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
       
        Album.find({name: regex}, function(err, allAlbum){
           if(err){
               console.log(err);
           } else {
              if(allAlbum.length < 1) {
                req.flash('error','Album not found!');
                res.redirect('back');
              }
              res.render("albums/index",{album:allAlbum, noMatch: noMatch});
           }
        });
    } else {
        
        Album.find({}, function(err, allAlbum){
           if(err){
               console.log(err);
           } else {
              res.render("albums/index",{album:allAlbum, noMatch: noMatch});
           }
        });
    }
});

router.post('/' , middleware.isLoggedIn, upload.single('image'),function(req,res){
    req.body.album.image = '/upload/' + req.file.filename;
    req.body.album.author = {
        id: req.user._id,
        username: req.user.username
    };
    // var newCollection = {name:name , image:image ,author: author};
    Album.create(req.body.album, function(err, newlyCreate){
        if(err){
            req.flash('success','Your album is created.');
            console.log(err);
        } else {
            res.redirect('/album');
        }
    });
    
});


router.get('/new', middleware.isLoggedIn, function(req,res){
    res.render('albums/new.ejs');
});

router.get('/:id' , function(req,res){
    Album.findById(req.params.id).populate('comments').exec(function(err, foundAlbum){
        if(err){
            console.log(err);
        } else {
            res.render('albums/show.ejs', {album: foundAlbum});
        }
    });
});

router.get('/:id/edit' , middleware.checkAlbumOwner, function(req,res){
    Album.findById(req.params.id, function(err, foundAlbum){
        if(err){
            console.log(err);
        }else {
            res.render('albums/edit.ejs' , {album: foundAlbum});
        }
    });
});

router.put('/:id', upload.single('image'), function(req,res){
    if(req.file){
        req.body.album.image = '/upload/' + req.file.filename;
    }
    Album.findByIdAndUpdate(req.params.id, req.body.album, function(err, updatedalbum){
        if(err){
            res.redirect('/album/');
        }else{
            res.redirect('/album/' + req.params.id);
        }
    });
});


router.delete('/:id' , middleware.checkAlbumOwner, function(req,res){
   Album.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/album/');
        }else{
            req.flash('success','Your album is deleted.');
            res.redirect('/album/');
        }
    });
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports  = router;
