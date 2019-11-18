var request = require('request');
var fs = require('fs');
var _ = require('lodash');

var url = "https://www.google.com";
var pageDirectory = 'TempFiles';

request.get(url, function (err, response, body) {
    if(err) {
        console.log("Error in downloading the page : "+ err.toString());
    }
    else if(response && response.statusCode == 200 && body) {
        try {
            if (!fs.existsSync(pageDirectory))
            fs.mkdirSync(pageDirectory);
        } catch (error) {
            console.log("Error during directory operation");
        }
        var file = pageDirectory + '/' + _.now() + '.html';
        fs.writeFile(file, body, function(err) {
            if(err) {
                console.log("Error while writing to the file " + file + " : " + err.toString());
            } else {
                console.log("Successfully written to the file " + file);
            }
        })
    } 
    else {
        console.log("Failed to access the page, response code : " + res.statusCode);
    }
});