var Handlebars = require('handlebars');
var fs = require('fs');
var templateSource = require('./HandlebarTemplate').templateSource;

var outputFile = "HandlebarsResult.xml";
var data = [
        {
          "baseId": "1",
          "feature": {
            "1": "parent",
            "2": "first entry"
          },
          "contentType": {
            "1": {
              "value": "pure"
            },
            "2": {
              "value": "mix"
            }
          },
          "isActive": true,
          "childProducts": [
            {
              "baseId": "1-1",
              "isActive": true
            },
            {
              "baseId": "1-2",
              "isActive": false
            },
            {
              "baseId": "1-3",
              "isActive": true
            },
            {
              "baseId": "1-4",
              "isActive": true,
              "feature": {
                "1": "parent",
                "2": "first entry"
              },
              "searchTerms": {
                "0": "glue",
                "1": "adhesive",
                "2": "stick"
              }
            }
          ]
        },
        {
          "baseId": "10",
          "isActive": true,
          "searchTerms": {
            "0": "glue",
            "1": "adhesive",
            "2": "stick"
          },
          "childProducts": [
            {
              "baseId": "10-1",
              "isActive": true,
              "searchTerms": {
                "0": "glue"
              }
            },
            {
              "baseId": "10-2",
              "isActive": false
            },
            {
              "baseId": "10-3",
              "isActive": true
            },
            {
              "baseId": "10-4",
              "isActive": true
            }
          ]
        }
      ];

try {
    var template = Handlebars.compile(templateSource);
    var result = template(data); 
    fs.writeFile(outputFile, result, function(err) {
        if (err) {
            console.log("Error while writing result to file : " + err);
        }
        else {
            console.log("Successfully written to the flie " + outputFile);
        }
    });
    console.log(result);
} catch (error) {
    console.log("Error while parsing handlebar expression : " + error);
}