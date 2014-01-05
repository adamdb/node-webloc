var node = node || {};

node.Webloc = function() {
   var fs = require('fs');

   fs.readdir(__dirname, function (err, files) {
      console.log(files);
   });    
};

var webloc = new node.Webloc();
