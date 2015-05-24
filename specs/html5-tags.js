module.exports = function(options){
  var page = options.page;
  var next = options.next;

  page.evaluate(
    function () {
      var tags = [
        'abbr',
        'article',
        'aside',
        'bdi',
        'canvas',
        'data',
        'datalist',
        'details',
        'dialog',
        'figcaption',
        'figure',
        'footer',
        'header',
        'hgroup',
        'main',
        'mark',
        'meter',
        'nav',
        'output',
        'picture',
        'progress',
        'section',
        'summary',
        'template',
        'time',
        'video'
      ];

      var found = tags.filter(function(el){
        return !!document.getElementsByTagName(el).length;
      });

      return found;
    }, function (result) {
      if(result){
        next(null, {
          problem: 'Your page contains the following unsupported HTML5 tags: ' + result.join(', '),
          solution: 'Try using https://github.com/aFarkas/html5shiv'
        });
      } else {
        next(null, null);
      }
    }
  );
};
