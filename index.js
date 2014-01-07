#! /usr/bin/env node

var node = node || {};

node.Webloc = function() {
   var fs = require('fs');
   var xml2js = require('xml2js');
   var util = require('util');   

   var parser  = new xml2js.Parser();

   fs.readdir(process.cwd(), function (err, files) {
      for (var i=0; i < files.length; i++) {
         readFile(files[i]);
      } 
   });
   
   function readFile(path) {
      fs.readFile(path, function(error, data) {
         if (error) {
            return console.log(error);
         }
            
         var parser = new xml2js.Parser();
   
         parser.parseString(data, function(error, result) {
            var extractedData = result['plist']['dict'][0]['string'][0];
         }); 
      }); 
   };    
};

var webloc = new node.Webloc();
