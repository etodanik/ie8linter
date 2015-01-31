module.exports = function(options){
  var page = options.page;
  var next = options.next;

  page.evaluate(
    function () {
      var tags = [
        'article',
        'aside',
        'bdi',
        'details',
        'dialog',
        'figcaption',
        'figure',
        'footer',
        'header',
        'main',
        'mark',
        'menuitem',
        'meter',
        'nav',
        'progress',
        'rp',
        'rt',
        'ruby',
        'section',
        'summary',
        'time',
        'wbr',
        'datalist',
        'keygen',
        'output',
        'canvas',
        'svg',
        'audio',
        'embed',
        'source',
        'track',
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
