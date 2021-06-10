/* const collection = require('../models/collection');
const music = require('../models/music');

var express     = require('express'),
    router      = express.Router(),
    // router = express.Router({
    //     mergeParams: true
    // });
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
    Collection  = require('../models/collection'),
    Music  = require('../models/music');

/* router.get('/', function(req,res){
    Collection.find({}, function(err, allCollection){
        if(err){
            console.log(err);
        }else{
            res.render('collections/index.ejs', {collection: allCollection}); 
        }
    });
    
}); */

/* router.get("/", function(req, res){
    var noMatch = null;
    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        
        Music.find({name: regex}, function(err, allMusic){
           if(err){
               console.log(err);
           } else {
              if(allMusic.length < 1) {
                req.flash('error','Music not found!');
                res.redirect('back');
              }
              res.render("song.ejs",{music:allMusic, noMatch: noMatch});
           }
        });
    } else {
       
        Music.find({}, function(err, allMusic){
           if(err){
               console.log(err);
           } else {
              res.render("song.ejs",{music:allMusic, noMatch: noMatch});
           }
        });
    }
});





function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};





module.exports  = router; */
