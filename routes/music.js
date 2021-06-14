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
    Music  = require('../models/music');


router.get('/' , function (req, res) {
    Music.find({}, function (err, allMusic) {
        if (err) {
            console.log(err);
        } else {
            res.render('admin/index.ejs', { music: allMusic });
        }
    });
});




function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};





module.exports  = router;
 */