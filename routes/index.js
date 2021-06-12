
var express     = require('express'),
router      = express.Router(),
User        = require('../models/user'),
Home        = require('../models/home'),
Artist       = require('../models/artist'),
multer      = require('multer'),
path        = require('path'),
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
passport    = require('passport');


router.get('/', function(req,res){
Home.find({}, function(err, allHome){
    if(err){
        console.log(err);
    }else{
        res.render('homes/home.ejs', {home: allHome}); 
    }
});
});


/* router.get('/', function(req,res){
res.render('home.ejs');
}); */

router.get('/register', function(req,res){
res.render('register.ejs');
});

router.post('/register' , upload.single('profileimg'), function(req,res){
req.body.profileimg = '/upload/' + req.file.filename;
var newUser = new User({
    username: req.body.username,
    firstname: req.body.firstname,
    email: req.body.email,
    profileimg: req.body.profileimg
});
if(req.body.adminCode === 'topsecret'){
    newUser.isadmin = true;
}
User.register(newUser, req.body.password, function(err, user){
    if(err){
        req.flash('error',err.message);
        res.redirect('/register');
    }
    passport.authenticate('local')(req,res , function(){
        req.flash('success','Welcome to MIAmusic'+ user.username);
        res.redirect('/');
    });
});
});

router.get('/login', function(req,res){
    res.render('login.ejs');

});
router.post('/login' , passport.authenticate('local' ,
{
    successRedirect: '/' ,
    failureRedirect: '/login',
    successFlash: true,
    failureFlash: true,
    successFlash: 'Successfully log in',
    failureFlash: 'Invalid username or password'
}), function(req,res){

});

router.get('/logout', function(req,res){
    req.logout();
    req.flash('success','Logged you out success.');
    res.redirect('/');
});

router.get('/user/:id', function(req, res){
User.findById(req.params.id, function(err, foundUser){
    if(err){
        req.flash('error', 'There is somethin wrong');
        return res.redirect('/');
    }
    Artist.find().where('author.id').equals(foundUser._id).exec(function(err, foundArtist){
        if(err){
            req.flash('error', 'There is somethin wrong');
            return res.redirect('/');
        }
        res.render('user/show.ejs', {user: foundUser, artists:  foundArtist});
    });
});
});

router.get('/user/:id/edit', function(req, res){
User.findById(req.params.id, function(err, foundUser){
    if(err){
        req.flash('error', 'There is somethin wrong');
        return res.redirect('/');
    }
    Artist.find().where('author.id').equals(foundUser._id).exec(function(err, foundArtist){
        if(err){
            req.flash('error', 'There is somethin wrong');
            return res.redirect('/');
        }
        res.render('user/edit.ejs', {user: foundUser, artists:  foundArtist});
    });
});
});

router.put('/user/:id', upload.single('image'), function(req,res){
if(req.file){
    req.body.user.image = '/upload/' + req.file.filename;
}
User.findByIdAndUpdate(req.params.id, req.body.user, function(err, updatedUser){
    if(err){
        res.redirect('/user/:id');
    }else{
        res.redirect('/user/:id' + req.params.id);
    }
});
});

router.get('/contact', function(req,res){
    res.render('contacts/index.ejs');

});

router.get('/search', function(req,res){
    res.render('search/index.ejs');

});


router.get('/package', function(req,res){
    res.render('packages/show.ejs');

});
router.get('/package/payment',middleware.isLoggedIn, function(req,res){
    res.render('payment/pay.ejs');
    
});






module.exports  = router;