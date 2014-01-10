#! /usr/bin/env node

var node = node || {};

node.Webloc = function() {
   var fs = require('fs');
   var xml2js = require('xml2js');
   var util = require('util');   
   var http = require('http');
   var request = require('request');
   
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
            var url = result['plist']['dict'][0]['string'][0];
            
            checkURL(url);
         }); 
      }); 
   };

   function checkURL(url) {
      process.stdout.write(url + ': ');
      
      var request = require('request');
      
      request(url, function (error, response, body) {
         if (!error && response.statusCode == 200) {
            process.stdout.write('GOOD\r\n');
         }
         else {
            process.stdout.write('BAD\r\n');
         }
      });
   }    
};

var webloc = new node.Webloc();
