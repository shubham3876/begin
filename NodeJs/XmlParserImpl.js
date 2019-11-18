var fs = require('fs');
var parse = require('xml-parser');
var _ = require('lodash');
var xmlParser = {
    // parse xml received as a parameter and returns json
    getJsonFromXml : function(xml) {
        try {
            return parse(xml);
        } catch (error) {
            console.log("Please provide valid xml: " + error.toString());
        }
    },
    
    // Parse Xml file and create a json file to the directory 
    getJsonFromXmlFile : function(file, outputDirectory, callback) {
        if (file && outputDirectory) {
            try {
                if (outputDirectory[outputDirectory.length - 1] === '/') {
                    outputDirectory = outputDirectory.substring(0, outputDirectory.length - 1);
                }
                fs.exists(file, function(exists) {
                    if (!exists) {
                        console.log("The file " + file + " does not exist.");
                    }
                    else {
                        var fileName = _.split(file, '.')[0];
                        fs.exists(outputDirectory, function(exists) {
                            if (!exists) {
                                fs.mkdirSync(outputDirectory);
                            }
                            try {
                                var xml = fs.readFileSync(file, 'utf8');
                                var jsonStream = fs.createWriteStream(outputDirectory + "/" + fileName + ".json");
                                var jsonObj = parse(xml);
                                jsonStream.write(JSON.stringify(jsonObj));
                                jsonStream.end();
                                callback(null, fileName + ".json");
                            } catch (error) {
                                callback(error);
                            }
                        });
                    }
                });
            } catch (error) {
                callback(error);
            }
        }
    }
};

module.exports = xmlParser;