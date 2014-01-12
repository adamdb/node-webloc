#! /usr/bin/env node

var node = node || {};

node.Webloc = function() {
   var fs = require('fs');
   var xml2js = require('xml2js');
   var util = require('util');   
   var http = require('http');
   var request = require('request');
   
   var parser  = new xml2js.Parser();
   var badUrlTotal = 0;
   var filesTotal = 0;
   var checkedTotal = 0;
 
   fs.readdir(process.cwd(), function (err, files) {
      filesTotal = files.length;   
   
      console.log('Starting check...');

      for (var i=0; i < filesTotal; i++) {
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
      request(url, function (error, response, body) {
         ++checkedTotal;

         if (!error && response.statusCode == 200) {
            console.log(url + ' – GOOD');
         }
         else {
            ++badUrlTotal;
            console.log(url + ' – BAD');
         }

         if (checkedTotal >= filesTotal) {
            completeCheck();
         }
      });
   }

   function completeCheck() {
      console.log('Finished!');
      console.log('Checked ' + filesTotal + ' Webloc files, ' + badUrlTotal + ' Bad and ' + (filesTotal - badUrlTotal) + ' Good');
   }    
};

var webloc = new node.Webloc();
