# ie8linter
A little tool to lint websites for IE8 compatibility, with warnings for possible pitfalls and suggested fixes.

![Screenshot](https://raw.githubusercontent.com/israelidanny/ie8linter/master/screenshot.png)

Unfortunately for some of us, there are still projects out there that require compatability with our friendly dinosaur IE8. For these special occasions I made this little linter. What it would do is spit all the usual suspects that cause incompatability and suggest fixes. Rather than scratch your head for hours about a missing navigation bar only to find you set an `initial` value on your `position` property in one of the multiple CSS files, just give it to the linter.

Right now this is still in development, but if you wanna see what it does already, `git clone` it, and then run `npm install` and then `node main.js`. It should be running on `http://localhost:3000/`.

## Contributing
Feel free to contribute your "favorite" pitfall or bug in the issues section or as a pull request (as of now the source code isn't very heavily commented, sorry about that).

I'd love to hear about suggestions of common pitfalls, useful polyfills and problems you had with IE8 you wish would have been caught by a linter automatically

You can always drop me a line here:
dannypovolotski@gmail.com
