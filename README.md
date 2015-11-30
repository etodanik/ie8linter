# ie8linter
A little tool to lint websites for IE8 compatibility, with warnings for possible pitfalls and suggested fixes.

You can see it live at:
http://ie8.caffeine.co.il/

![Screenshot](https://raw.githubusercontent.com/israelidanny/ie8linter/master/screenshot.png)

Unfortunately for some of us, there are still projects out there that require compatibility with our friendly dinosaur IE8. For these special occasions I made this little linter. What it would do is spit all the usual suspects that cause incompatibility and suggest fixes. Rather than scratch your head for hours about a missing navigation bar only to find you set an `initial` value on your `position` property in one of the multiple CSS files, just give it to the linter.

## Installation
- `git clone https://github.com/israelidanny/ie8linter.git`
- `cd ie8linter`
- `npm install -g phantomjs && npm install`
- `node main.js`

## Contributing
Feel free to contribute your "favorite" pitfall or bug in the issues section or as a pull request (as of now the source code isn't very heavily commented, sorry about that).

I'd love to hear about suggestions of common pitfalls, useful polyfills and problems you had with IE8 you wish would have been caught by a linter automatically

You can always drop me a line here:
dannypovolotski@gmail.com

## Support

Get help with ie8linter [on Codementor](https://www.codementor.io/danny?utm_source=github&utm_medium=link&utm_term=danny&utm_campaign=github).

[![Contact me on Codementor](https://cdn.codementor.io/badges/get_help_github.svg)](https://www.codementor.io/danny?utm_source=github&utm_medium=button&utm_term=danny&utm_campaign=github)
