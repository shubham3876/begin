var async = require('async');
var fs = require('fs');
var _ = require('lodash');
var os = require('os');
var TinyURL = require('tinyurl');

var actualUrls = require('./UrlLinks').urls;
var shortenedUrlOutput = [];
shortenedUrlOutput[0] = "Actual URL,Shortened URL";
var outputDirectory = "ShortenedUrls/";
    
async.forEachOf(actualUrls, function(url, index, callback) {
    console.log("Shortening url " + url);

    TinyURL.shorten(url, function(result, err) {
        if (err) {
            console.log("Error while shortening url " + url + " : " + err.toString());
            return callback(err);
        }
        try {
            console.log("Shortened url " + url + " as : " + result);
            shortenedUrlOutput[index + 1] = url + "," + result;
        } catch (error) {
            console.log("Shortened url " + url + " but error while processing : " + err.toString());
            return callback(error);
        }
        callback();
    })
    
}, function(err) {
    if (err) {
        console.log("Error occurred while shortening URLs : " + err.message);
    }
    if (!err && outputDirectory){
        if (!fs.existsSync(outputDirectory)) {
            fs.mkdirSync(outputDirectory);
        }
        var file = outputDirectory + _.now() + '.csv';
        fs.writeFile(file, shortenedUrlOutput.join(os.EOL), function(err) {
            if (err) {
                console.log("Error while writing shortened URLs to file : " + err.toString());
            }
            else {
                console.log("Successfully shortened and saved all URLs");
            }
        })
    }
});