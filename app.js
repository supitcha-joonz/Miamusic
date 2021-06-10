var   express           = require('express'),
      app               = express(),
      bodyParser        = require('body-parser'),
      mongoose          = require('mongoose'),
      flash             = require('connect-flash'),
      passport          = require('passport'),
      LocalStrategy     = require('passport-local'),
      methodOverride    = require('method-override'),
      Artist            = require('./models/artist'),
      Comment           = require('./models/comment'),
      Album             = require('./models/album'),
      Home              = require('./models/home'),
      User              = require('./models/user'),
      seedDB            = require('./seed');    

      
var artistRoutes        = require('./routes/artists'),
    commentRoutes       = require('./routes/comments'),
    albumRoutes         = require('./routes/albums'),
    adminRoutes         = require('./routes/admin'),
    indexRoutes         = require('./routes/index');
   


mongoose.connect('mongodb://localhost/uCollectionV3');
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine','ejs');
seedDB();
// app.use(express.static(__dirname + 'public'));
app.use(methodOverride('_method'));
app.use(flash());

app.use(require('express-session')({
    secret: 'secret',
    resave: false,
    saveUnitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});



app.use('/artist', artistRoutes);

app.use('/album', albumRoutes);

app.use('/collection/:id/comments', commentRoutes);

app.use('/', indexRoutes);

app.use('/admin', adminRoutes);









app.listen(3000, function(){
    console.log('uMusic is started....');
});
