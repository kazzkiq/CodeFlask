[![npm version](https://badge.fury.io/js/codeflask.svg)](https://www.npmjs.com/package/codeflask)

# CodeFlask.js
A micro code-editor for awesome web pages.

## Version 1.0.0

(WIP)

The goals of this new version are:

- Use ES6/7+ syntax for CodeFlask source code;
- Generate production files automatically (via Rollup);
- Write decent automated tests to prevent things breaking every new release;
- Improve performance making use of WebWorkers on Prism.js;
- Embbed Prism as a CodeFlask dependency, so users don't neet to install other things;
- Create a default theme for CodeFlask independent from default Prism.js one.
- Add line numbers support out of the box (without the need of plugins);
- (If possible) make code even smaller;
- Enable importing of language support on the fly (`flask.addLanguage()`, etc);
- Drop support for older browsers;
- Drop support for Bower;
- Drop support for `.runAll()`;
- Add support for autoclosing basic characters;
... the list may get bigger.