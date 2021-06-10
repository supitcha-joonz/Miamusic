var mongoose    = require('mongoose');
var Album       = require('./models/album');
var Artist      = require('./models/artist');
var Comment     = require('./models/comment');
var Home        = require('./models/home');
var Music       = require('./models/music');

var data = [
    {   
        name: 'Justin Bieber',
        image: '/upload/image-1622969588528.jpg',
        /* lysics: "I got my peaches out in Georgia (oh, yeah, shit)  I get my weed from California (that's that shit)    I took my chick up to the North, yeah (badass bitch) I get my light right from the source, yeah (yeah, that's it) And I see you (oh), the way I breathe you in (in) It's the texture of your skin I wanna wrap my arms around you, baby Never let you go, oh And I say, oh, there's nothing like your touch It's the way you lift me up, yeah And I'll be right here with you 'til the end I got my peaches out in Georgia (oh, yeah, shit) I get my weed from California (that's that shit) I took my chick up to the North, yeah (badass bitch) I get my light right from the source, yeah (yeah, that's it) You ain't sure yet, but I'm for ya  All I could want, all I can wish for Nights alone that we miss more And days we save as souvenirs There's no time, I wanna make more time And give you my whole life I left my girl, I'm in Mallorca Hate to leave her, call it torture Remember when I couldn't hold her Left the baggage for Rimowa I got my peaches out in Georgia (oh, yeah, shit) I get my weed from California (that's that shit) I took my chick up to the North, yeah (badass bitch) I get my light right from the source, yeah (yeah, that's it) I get the feeling, so I'm sure (sure) Hand in my hand because I'm yours I can't, I can't pretend, I can't ignore you're right for me Don't think you wanna know just where I've been, oh Done bein' distracted The one I need is right in my arms (oh) Your kisses taste the sweetest with mine And I'll be right here with you 'til end of time I got my peaches out in Georgia (oh, yeah, shit) I get my weed from California (that's that shit) I took my chick up to the North, yeah (badass bitch) I get my light right from the source, yeah (yeah, that's it) I got my peaches out in Georgia (oh, yeah, shit) I get my weed from California (that's that shit) I took my chick up to the North, yeah (badass bitch) (I get my light right from the source, yeah, yeah) I got my peaches out in Georgia (oh, yeah, shit) I get my weed from California (that's that shit) I took my chick up to the North, yeah (badass bitch) I get my light right from the source, yeah (yeah, that's it) I got my peaches out in Georgia (oh, yeah, shit) I get my weed from California (that's that shit) I took my chick up to the North, yeah (badass bitch) I get my light right from the source, yeah (yeah, that's it)", */

    },
    {   
        name: 'Charlie Puth',
        image: '/upload/image-1622969710006.jpg',
    },
    {   
        name: 'One Direction',
        image: '/upload/image-1622969834238.jpg',
        
      
    },
    {   
        name: 'Cardi B',
        image: '/upload/image-1622969911352.jpg',
        
      
    },
    {   
        name: 'Shawn Mendes',
        image: '/upload/image-1622969967522.jpg',
        
      
    },
    {   
        name: 'Major Lazer',
        image: '/upload/image-1622970024315.jpg',
        
      
    },
    {   
        name: 'Drake',
        image: '/upload/image-1622970086658.jpg',
        
      
    },
    {   
        name: 'The Chainsmokers',
        image: '/upload/image-1622970134384.jpg',
        
      
    },
    {   
        name: 'Dua Lipa',
        image: '/upload/image-1622970189924.jpg',
        
      
    },
    {   
        name: 'Selena Gomez',
        image: '/upload/image-1622970242986.jpg',
        
      
    },
    {   
        name: 'Taylor Swift',
        image: '/upload/image-1622970288198.jpg',
        
      
    },
    {   
        name: 'Bruno Mars',
        image: '/upload/image-1622970331124.jpg',
        
      
    },
        
]; 

var dataalbum = [
    {   
        name: 'Justice', 
        image:'/upload/image-1622987183108.jpg',
       
    },
    {   
        name: 'Voicenotes', 
        image:'/upload/image-1622987297896.jpg',
        
    },
    {   
        name: 'Invasion of Privacy', 
        image:'/upload/image-1622987306265.jpg',
        
    },
    {   
        name: 'Wonder', 
        image:'/upload/image-1622987313433.jpg',
        
    },
    {   
        name: 'Acoustic - EP', 
        image:'/upload/image-1622987325533.jpg',
        
    },
    {   
        name: 'Music Is the Weapon', 
        image:'/upload/image-1622987332705.jpg',
        
    },
    {   
        name: 'Certified Lover Boy', 
        image:'/upload/image-1622987339171.jpg',
        
    },
    {   
        name: 'World War Joy', 
        image:'/upload/image-1622987345746.jpg',
       
    },
    {   
        name: 'Future Nostalgia', 
        image:'/upload/image-1622987354868.jpg',
        
    },
    {   
        name: 'Revelación', 
        image:'/upload/image-1622987364935.jpg',
        
    },
    {   
        name: 'Folklore', 
        image:'/upload/image-1622987372968.jpg',
        
    },
    {   
        name: 'An Evening with Silk Sonic', 
        image:'/upload/image-1622987380292.jpg',
       
    },
        
]; 

var homepage = [
    {   
        image:'/upload/image-1622988200705.jpg',
        song: 'Peaches',
        picture:'/upload/image-1622988075412.jpg',
        song1: 'See You Again',
        picture1:'/upload/image-1622987782515.jpg',
        song2: 'WAP',
        picture2:'/upload/image-1622987793074.jpg',
        namealb: 'Justice',
        ipcalb:'/upload/image-1622987183108.jpg',
        namealb1: 'Voicenotes',
        ipcalb1:'/upload/image-1622987297896.jpg',
        namealb2: 'Invasion of Privacy',
        ipcalb2:'/upload/image-1622987306265.jpg',
        art: '/upload/image-1622988208890.jpg',
 
    }

]; 


function seedDB(){
    Artist.remove({}, function(err){
        if(err) {
            console.log(err);
        }
        console.log("Remove DB completed");
        data.forEach(function(seed){
            Artist.create(seed, function(err, artist){
                if(err) {
                    console.log(err);
                } else {
                    console.log('New data added');
                }
            });
        }); 
    });

    Album.remove({}, function(err){
        if(err){
            console.log(err);
        } 
            console.log("Remove DB Completed");
            dataalbum.forEach(function(seed){
                Album.create(seed, function(err, album){
                    if(err){
                        console.log(err);
                    }else {
                        console.log('New Album data added');
                    }
                });
            });
        });
    Home.remove({}, function(err){
        if(err){
            console.log(err);
        } 
            console.log("Remove DB Completed");
            homepage.forEach(function(seed){
                Home.create(seed, function(err, homepage){
                    if(err){
                        console.log(err);
                    }else {
                        console.log('New Slide data added');
                }
            });
        });
    });

    /* Song.remove({}, function(err){
        if(err) {
            console.log(err);
        }
        console.log("Remove DB completed");
        music.forEach(function(seed){
            Song.create(seed, function(err, song){
                if(err) {
                    console.log(err);
                } else {
                    console.log('New song added');
                }
            });
        });
    }); */
    

}

module.exports = seedDB;