var parser = require('./XmlParserImpl');

var xml = "<products>\n" +
        "<product>\n" +
        "<baseId></baseId>\n" +
        "<isActive></isActive>\n" +
        "<contentType>\n" +
        "<contentTypeValue></contentTypeValue>\n" +
        "</contentType>\n" +
        "<features>\n" +
        "<feature></feature>\n" +
        "</features>\n" +
        "<searchTerms>\n" +
        "<searchTermValue></searchTermValue>\n" +
        "</searchTerms>\n" +
        "<childProducts>\n" +
        "<childProduct>\n" +
        "<baseId></baseId>\n" +
        "<isActive></isActive>\n" +
        "<features>\n" +
        "<feature></feature>\n" +
        "</features>\n" +
        "<searchTerms>\n" +
        "<searchTermValue></searchTermValue>\n" +
        "</searchTerms>\n" +
        "</childProduct>\n" +
        "<childProduct>\n" +
        "<baseId></baseId>\n" +
        "<isActive></isActive>\n" +
        "<features>\n" +
        "<feature></feature>\n" +
        "</features>\n" +
        "<searchTerms>\n" +
        "<searchTermValue></searchTermValue>\n" +
        "</searchTerms>\n" +
        "</childProduct>\n" +
        "<childProduct>\n" +
        "<baseId></baseId>\n" +
        "<isActive></isActive>\n" +
        "<features>\n" +
        "<feature></feature>\n" +
        "</features>\n" +
        "<searchTerms>\n" +
        "<searchTermValue></searchTermValue>\n" +
        "</searchTerms>\n" +
        "</childProduct>\n" +
        "</childProducts>\n" +
        "</product>\n" +
        "</products>";

var xmlFile = "sampleXml.xml";
var outputDirectory = "JsonConvertedFromXml";

parser.getJsonFromXmlFile(xmlFile, outputDirectory, function(err, outputFile) {
    if (err) {
        console.log("Error creating json file from " + xmlFile + " : " + err.toString());
    }
    else {
        console.log("Successfully created file " + outputFile);
    }
})
var jsonResponse = parser.getJsonFromXml(xml);
console.log("Converted JSON is: ");
console.log(jsonResponse);


