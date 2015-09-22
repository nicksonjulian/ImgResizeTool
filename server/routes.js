/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');
//var express= require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var http = require('http');
var gm = require('gm');
var request = require('request');

var download = function(url, filename, app, callback){
  request.head(url, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(url).pipe(fs.createWriteStream(app.get('appPath') + "/assets/" + filename)).on('close', callback);

  });
};


// var request = require('request');

// var loadImage = function (url, callback) {
//     // Required 'request' module

//     // Make request to our image url
//     request({url: url, encoding: null}, function (err, res, body) {
//         if (!err && res.statusCode == 200) {
//             // So as encoding set to null then request body became Buffer object
//             var base64prefix = 'data:' + res.headers['content-type'] + ';base64,'
//                 , image = body.toString('base64');
//             if (typeof callback == 'function') {
//                 callback(image, base64prefix);
//             }
//         } else {
//             throw new Error('Can not download image');
//         }
//     });
// };

module.exports = function(app) {

  // Insert routes below
  app.use('/api/things', require('./api/thing'));
                 
 // app.use(bodyParser());

  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  app.route('/img_resize')
    .post(function(req, res) {
      console.log("THE IMG URL: " + req.body.imgUrl);

      download(req.body.imgUrl, "file.png", app, function() {
        gm(app.get('appPath') + '/assets/file.png').resize(540, 240).write(app.get('appPath') + '/assets/file2.png', function(err) {
          console.log(err);
        });
        console.log("done downloading");
        res.sendFile(path.resolve(app.get('appPath') + '/app/resize/resize.html'));
      });





      // var request = http.get(req.body.imgUrl, function(response) {
      //   response.pipe(file);
      //   res.writeHead(200, {"Content-Type" : "text/html"});
      //   res.write("<img src='file.jpg'/>");
      //   console.log("done");
      //   res.end();
      // });

      //http://www.google.com/images/srpr/logo3w.png
      // loadImage("http://www.google.com/images/srpr/logo3w.png", function (image, prefix) {
      //   res.write("done rpocess!")
      //   html = '<img src="' + prefix + image + '"/>';
      //   res.write(html)
      // });
    }
    
  );

  // All other routes should redirect to the index.html
  app.route('/')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    })
};