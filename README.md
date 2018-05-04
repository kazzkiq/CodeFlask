[![npm version](https://badge.fury.io/js/codeflask.svg)](https://www.npmjs.com/package/codeflask)
[![Build Status](https://travis-ci.org/kazzkiq/CodeFlask.js.svg?branch=master)](https://travis-ci.org/kazzkiq/CodeFlask.js)

# CodeFlask
A micro code-editor for awesome web pages.

## Version 1.0.0

(WIP)

The goals of this new version are:

- [x] Use ES6/7+ syntax for CodeFlask source code;
- [x] Generate production files automatically (via Rollup);
- [x] Write decent automated tests to prevent things breaking every new release;
- [ ] Improve performance making use of WebWorkers on Prism.js; (Under discussion);
- [x] Embbed Prism as a CodeFlask dependency, so users don't neet to install other things;
- [x] Create a default theme for CodeFlask independent from default Prism.js one.
- [x] Add line numbers support out of the box (without the need of plugins);
- [ ] ~~(If possible) make code even smaller;~~ **(Since CodeFlask adds more features, this is impossible)**
- [x] Enable importing of language support on the fly (`flask.addLanguage()`, etc);
- [x] Drop support for older browsers;
- [x] Drop support for Bower;
- [x] Drop support for `.runAll()`;
- [x] Add support for autoclosing basic characters;
... the list may get bigger.
