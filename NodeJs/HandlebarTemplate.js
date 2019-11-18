var templateSource = "<products>\n" +
            "{{#each this}}" +
            "<product>\n" +
                "<baseId>{{baseId}}</baseId>\n" +
                "<features>\n" +
                    "{{#each feature}}" +
                    "<feature>{{this}}</feature>\n" +
                    "{{/each}}" +
                "</features>\n" +
                "<searchTerms>\n" +
                    "{{#each searchTerms}}" +
                    "<searchTermValue>{{this}}</searchTermValue>\n" +
                    "{{/each}}" +
                "</searchTerms>\n" +
                "<isActive>{{isActive}}</isActive>\n" +
                "<contentType>\n" +
                    "{{#each contentType}}" +
                    "<contentTypeValue>{{value}}</contentTypeValue>\n" +
                    "{{/each}}" +
                "</contentType>\n" +
                "<childProducts>\n" +
                    "{{#each childProducts}}" +
                    "<childProduct>\n" + 
                        "<baseId>{{baseId}}</baseId>\n" +
                        "<features>\n" +
                            "{{#each feature}}" +
                            "<feature>{{this}}</feature>\n" +
                            "{{/each}}" +
                        "</features>\n" +
                        "<searchTerms>\n" +
                            "{{#each searchTerms}}" +
                            "<searchTermValue>{{this}}</searchTermValue>\n" +
                            "{{/each}}" +
                        "</searchTerms>\n" +
                        "<isActive>{{isActive}}</isActive>\n" +
                    "</childProduct>\n" +
                    "{{/each}}" +
                "</childProducts>\n" +
            "</product>\n" +
            "{{/each}}" +
            "</products>";

module.exports.templateSource = templateSource;