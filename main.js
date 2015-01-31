var phantom = require('phantom');
var ls = require('ls');
var _ = require('underscore');
var async = require('async');
var specs = ls('./specs/*.js');
var jade = require('jade');
var express = require('express');
var app = express();

var lintAddress = function(req, res, next){
  var url = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

  if(req.query.address && req.query.address.match(url)){
    phantom.create(function (ph) {
      ph.createPage(function (page) {
        page.open(req.query.address, function (status) {
          async.map(
            specs,
            function(spec, callback){
              require(spec.full)({
                page: page,
                status: status,
                next: callback,
                ph: ph
              });
            }, function(err, results){
              ph.exit();

              res.render('index.jade', {
                problems: _.flatten(results),
                address: req.query.address
              });
            }
          );
        });
      });
    });
  } else {
    res.render('index.jade');
  }
};


app.get('/', lintAddress);

app.listen(3000);
