var _ = require('underscore');
var async = require('async');
var request = require('request');
var css = require('css');

/**
 * this is a regex map for unsupported css properties
 * the key is a regex string, the value is an array of
 * unsupported value regex strings.
 * the value can either be just a string, like this:
 *  'initial'
 * or an object that has both the problematic value
 * and a proposed solution, like so:
 *  {
 *    value: 'initial',
 *    solution: 'Try changing to the explicit default value for this property'
 *  }
 **/
var unsupported = {
  '.*': [
    {
      value: 'initial',
      solution: 'Try changing to the explicit default value for this property'
    },
    {
      value: 'rem',
      solution: 'You can change the value to px or em, or give this polyfill a try: https://github.com/chuckcarpenter/REM-unit-polyfill'
    },
    {
      value: 'rgba',
      solution: 'rgba() is not supported. Read more here: http://css-tricks.com/rgba-browser-support/'
    }
  ],
  'empty-cells': [
    {
      value: '.*',
      solution: 'Internet Explorer does not support use of the empty-cells property'
    }
  ],
  'display': ['inline-table', 'table-cell']
};

function findInitialInCssText(text, callback){
  var i;
  var k;
  var problems = [];

  try{
    var parsedStylesheet = css.parse(text);
    checkRules(parsedStylesheet.stylesheet.rules, problems);
  } catch (e){
    problems.push({
      problem: 'Error while parsing CSS: ' + e.toString(),
      solution: 'Try checking your css to have good syntax, matching brackets e.t.c'
    });
  }

  callback(null, problems);
};

function checkRules(rules, problems){
  _(rules).each(function(rule){
    // Generally we don't want to
    if(rule.type !== 'rule') {
      // ... it's a media query! Whoopsie...
      if(rule.type === 'media'){
        // console.log('rule', rule);
        problems.push({
          problem: '[Line: ' + rule.position.start.line +'] [Column: ' + rule.position.start.column + '] Media queries are not supported and will horribly mess up your page',
          solution: 'Use https://github.com/scottjehl/Respond'
        });

        // We will also take a look at the actual media query and see if
        // there's anything fishy in there
        checkRules(rule.rules, problems);
      }

      return;
    }

    _(rule.declarations).each(function(declaration){
      checkDeclaration(declaration, problems);
    });
  });
};

function checkDeclaration(declaration, problems){
  if(declaration.type !== 'declaration') return;
  _.each(unsupported, function(badValues, property){
    if(declaration.property.match(new RegExp(property))){
      _.each(badValues, function(badValue){
        var match;

        if(_.isString(badValue)){
          match = declaration.value.match(new RegExp(badValue));
        } else if(_.isObject(badValue)){
          match = declaration.value.match(new RegExp(badValue.value));
        }

        if(match){
          var problem = {
            problem: '[Line: ' + declaration.position.start.line +'] [Column: ' + declaration.position.start.column + '] Value `' + declaration.value + '` not supported for property `' + declaration.property + '`',
          }

          if(_.isObject(badValue) && badValue.solution){
            problem.solution = badValue.solution;
          }

          problems.push(problem);
        }
      });
    }
  });
};

module.exports = function(options){
  var page = options.page;
  var next = options.next;

  page.evaluate(
    function () {
      var i;
      var k;
      var stylesheets = [];

      for(i=0;i<document.styleSheets.length;i++){
        var rules = [];

        if(document.styleSheets.cssRules){
          for(k=0;k<document.styleSheets.cssRules.length;k++){
            rules.push(document.styleSheets.cssRules[k].cssText);
          }
        }

        stylesheets.push({
          href: document.styleSheets[i].href,
          rules: rules
        });
      }

      return stylesheets;
    }, function (stylesheets) {
      var problems = [];

      async.each(
        stylesheets,
        function(stylesheet, callback){
          if(stylesheet.href){
            request(
              {
                method: 'GET',
                uri: stylesheet.href
              },
              function(error, response, body) {
                if(body && response.statusCode == 200){
                  findInitialInCssText(body, function(err, stylesheetProblems){
                    _(stylesheetProblems).each(function(problem){
                      problem.problem = '[' + stylesheet.href + '] ' + problem.problem;
                      problems.push(problem);
                    });

                    callback();
                  });
                } else {
                  callback();
                }
              }
            );
          } else {
            callback();
          }
        },
        function(err){
          next(null, problems);
        }
      );
    }
  );
};
