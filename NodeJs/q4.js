var async = require('async');
var request = require('request');
var fs = require('fs');
var zlib = require('zlib');
var images = require('./UrlLinks').urls;

var directoryFileLimit = 5;
var directory = "Downloaded_Images/";

if (directoryFileLimit) {
    try {
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory);
        }
        for (var i = 1; i <= Math.ceil(images.length / directoryFileLimit); ++i) {
            if (!fs.existsSync(directory + i)) {
                fs.mkdirSync(directory + i);
            }
        }
        console.log("Prerequisite complete. Lets start downloading images in parallel");
    } catch (error) {
        console.log("Error during directory operation : " + error.toString());
    }
    
    async.forEachOf(images, function(imageUrl, index, callback) {
        var imageNumber = index + 1;
        console.log("Beginning to download image number " + imageNumber);
        var fileName = "image" + imageNumber + ".gz";
        var subDirectory;
        if (imageNumber % directoryFileLimit) {
            subDirectory = Math.floor(imageNumber / directoryFileLimit) + 1;
        }
        else {
            subDirectory = imageNumber / directoryFileLimit;
        }
        subDirectory = subDirectory + "/";
        var filePath = directory + subDirectory + fileName;
    
        try {
            var listener = request(imageUrl);
            listener.pipe(zlib.createGzip()).pipe(fs.createWriteStream(filePath));
                
            listener.on('end',function(){
                console.log("Successfully processed image number " + imageNumber + " and created file " + fileName);
                return callback(); 
            });
                
            listener.on('error',function(error){
                console.log("Error while writing image to file " + fileName + " : " + error.toString());
                return callback(error);
            });
        } catch (error) {
            console.log("Error occurred while downloading image number " + imageNumber);
            callback(error);
        }
    
    }, function(err) {
        if (err) {
            console.log("Completion of images downloading failed with error " + err.toString());
        }
        else {
            console.log("Done. Successfully downloaded images");
        }
    });
    
}
else {
    console.log("You have not allowed any file to be written to directory")
}