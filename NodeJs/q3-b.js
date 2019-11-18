var request = require('request');
var fs = require('fs');
var _ = require('lodash');

var url = "https://www.google.com";
var pageDirectory = 'TempFiles';
var file = pageDirectory + '/' + _.now() + '.html';

var listener = request('http://www.google.com/');
// returns an instance of ClientRepsonse which extends stream and stream extends EventEmitter

listener.pipe(fs.createWriteStream(file));

listener.on('end',function(){
   console.log("Done processing. File " + file + " has been created"); 
});

listener.on('error',function(error){
    console.log("Processing failed with error : " + error.toString()); 
});