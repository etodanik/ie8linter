var phantom = require('phantom');
var ls = require('ls');
var _ = require('underscore');
var async = require('async');
var specs = ls('./specs/*.js');
var jade = require('jade');
var express = require('express');
var app = express();
var path = require('path');
var urlPattern = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
var NodeCache = require('node-cache');
var cache = new NodeCache({ stdTTL: 1800, checkperiod: 600 });
var port = 3170;

// serve static files
app.use("/", express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res, next){
  res.render('index.jade', {
    address: req.query.address && req.query.address.match(urlPattern) ? req.query.address : ''
  });
});

app.get('/lint/:address', function(req, res, next){
  res.status(200).json({
    success: true,
    data: _.flatten(req.problems)
  });
});

app.param('address', function(req, res, next, address){
  var cached;

  if(address && address.match(urlPattern)){
    cached = cache.get(address);

    if(!_.isEmpty(cached)){
      req.problems = cached[address];
      next();
    } else {
      phantom.create(function (ph) {
        ph.createPage(function (page) {
          page.open(address, function (status) {
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
                req.problems = _.flatten(results);
                cache.set(address, req.problems);
                next();
              }
            );
          });
        });
      });
    }
  } else {
    res.status(400).json({
      success: false,
      error: "The address you entered doesn't look quite right."
    });
  }
});

app.listen(port);
console.log('Listening on port', port);
