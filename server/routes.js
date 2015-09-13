/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');
//var express= require('express');
var bodyParser = require('body-parser')

module.exports = function(app) {

  // Insert routes below
  app.use('/api/things', require('./api/thing'));
                 
  app.use(bodyParser());

  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  app.route('/img_resize')
    .post(function(req, res) {
      res.send('You sent the name ' + req.body.imgUrl);
    }
  );

  // All other routes should redirect to the index.html
  app.route('/')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    })
    .post(function(req, res) {
      res.send('You sent the name ' + req.body.imgUrl);
    });
};
