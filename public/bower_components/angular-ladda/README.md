# angular-ladda [![Build Status](https://travis-ci.org/remotty/angular-ladda.svg?branch=master)](https://travis-ci.org/remotty/angular-ladda)

An angular directive wrapper for Ladda.

[Check out the demo page.](http://remotty.github.io/angular-ladda)


## Getting started

(1) Get angular-ladda via [Bower](http://bower.io/)

```sh
$ bower install angular-ladda
```
or add bower.json
```sh
$ bower install angular-ladda --save
```

(2) add css & javascript link to html

```html
...
<link rel="stylesheet" href="bower_components/ladda/dist/ladda-themeless.min.css">
...
<script src="bower_components/ladda/dist/spin.min.js"></script>
<script src="bower_components/ladda/dist/ladda.min.js"></script>
<script src="bower_components/angular-ladda/dist/angular-ladda.min.js"></script>
...
```

(3) add `'angular-ladda'` to your main module's list of dependencies

```javascript
var myApp = angular.module('myApp', ['angular-ladda']);
```

(4) enjoy!

## Quick example

### options

use `laddaProvider`

- style
   - expand-left
   - expand-right
   - expand-up
   - expand-down
   - zoom-in
   - zoom-out
   - slide-left
   - slide-right
   - slide-up
   - slide-down
   - contract

```js
angular.module(xxxx)
  .config(function (laddaProvider) {
    laddaProvider.setOption({ 
      style: 'expand-left'
    });
  })
```

### controller

```javascript
  $scope.login = function() {
    // start loading
    $scope.loginLoading = true;
    loginService.login(function() {
      // stop loading
      $scope.loginLoading = false;
    });
  }
```

### view

basic

```html
<button ladda="loginLoading" ng-click="login()">
  Login
</button>
```

change style of effect

```html
<button ladda="loginLoading" ng-click="login()" data-style="expand-left">
  Login
</button>
```

change size of spinner

```html
<button ladda="loginLoading" ng-click="login()" data-spinner-size="10">
  Login
</button>
```

change color of spinner

```html
<button ladda="loginLoading" ng-click="login()" data-spinner-color="#FF0000">
  Login
</button>
```

## Links

* [Ladda](http://lab.hakim.se/ladda/)

## Contributing

1. Fork it ( https://github.com/remotty/angular-ladda/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

### setup

```
$ bower install
$ npm install
$ node_modules/protractor/bin/webdriver-manager update
```

### test

```
$ gulp test
```

### build

```
$ gulp
```
