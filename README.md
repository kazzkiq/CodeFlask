[![npm version](https://badge.fury.io/js/codeflask.svg)](https://www.npmjs.com/package/codeflask)

# CodeFlask.js
A micro code-editor for awesome web pages.

<img width="983" alt="CodeFlask.js" src="https://cloud.githubusercontent.com/assets/1953194/9321840/ed0eb022-4541-11e5-9390-30f7dfff82e1.png">


## About

CodeFlask.js lets you easily and effortless put an code-editor to your web page.

It was made as an attempt to create a leaner editor for simple purposes. Just a few lines of code and you're ready to play with code in the browser.

If you want a robust web code editor you can check projects that aim that big, such as CodeMirror.

## Install


**Bower:**

```
bower install codeflask
```

**NPM:**

```
npm install codeflask
```

**CDN (provided by [cdnjs](https://github.com/cdnjs/cdnjs)):**
```
https://cdnjs.cloudflare.com/ajax/libs/CodeFlask.js/0.1.1/codeflask.min.js
```

Or download them manually if you want to.

## Usage

In order to use CodeFlask.js you need also import [Prism.js](https://github.com/PrismJS/prism) (for code highlight) into your project. Prism basically uses two files, an `.js` file and an `.css` one (where you can theme the code syntax).

To output the line numbers you would also need the [Line Numbers](http://prismjs.com/plugins/line-numbers/) plugin.

After importing Prism, you will need two files from CodeFlask.js also. They are the `codeflask.js` and `codeflask.css`. Both are really small and only with the necessarily to make everything work properly.

Example:

```html
...
<head>
  <link rel="stylesheet" href="prism.min.css">
  <link rel="stylesheet" href="codeflask.css">
  <script src="prism.min.js" async></script>
  <script src="codeflask.js" async></script>
</head>
```

Notice that `prism.min.js` must be declared **before** `codeflask.js`, as CodeFlask.js have dependency on the first.<br>
<sup>*Obs.: It is recomended to declare JavaScript files at the end of your `<body>` tag, the above example is just for ease of understanding purposes.*</sup>

After that, all you need to do is to define an element where your editor should be rendered, and call it on JavaScript:

```html
...
<body>
  <div id="my-code-wrapper" data-language="javascript"></div>

  <script>
    var flask = new CodeFlask;
    flask.run('#my-code-wrapper');
  </script>
</body>
```

Alternatively, you can define a language directly on your function call:

```javascript
var flask = new CodeFlask;
flask.run('#my-code-wrapper', { language: 'javascript', lineNumbers: true })
```

 It is important to remember that CodeFlask.js checks primarily for `data-language` attribute, then for the function call version. If none of those are declared, the editor will render in **HTML syntax**;

#### Listening for changes and updating your editor

You can also listen for changes in your editor. This is useful if you want to do some kind of realtime rendering of what you're coding, or detecting the input code for validation purposes, etc.

You can listen for it using `.onUpdate()`:

```javascript
var flask = new CodeFlask;
flask.run('#my-editor');

flask.onUpdate(function(code) {
    console.log("User's input code: " + code);
});
```

Alternatively, if you want to update an editor, you can use `.update()`:

```javascript
var flask = new CodeFlask;
flask.run('#my-editor');

flask.update("<button>Heeeey, whats up?</button>");
```

#### Configuring right-to-left

If you would like CodeFlask to start in the right to left configuration, pass 'true' to the 'rtl' parameter as shown below:

```javascript
...
const flask = new CodeFlask;
flask.run('#editor', {language: 'javascript', rtl: true}) // add rtl functionality
```

#### Loading multiple editors

If you have a lot of editors on your page you can load them all by using `.runAll()` instead of `.run()`:

```html
...
<body>
  <div class="my-code-wrappers" data-language="javascript"></div>
  <div class="my-code-wrappers" data-language="css"></div>
  <div class="my-code-wrappers" data-language="ruby"></div>

  <script>
    var flask = new CodeFlask;
    flask.runAll('.my-code-wrappers');
  </script>
</body>
```

Note: When using `.runAll()`, the listener and update APIs are **not** enabled anymore.

#### How do I define the size of my editor?

The editor will assume the size of the element it was declared in. All you need to do is to set the dimensions of this element in your style, example:

```html
...
<body>
  <style>
  #my-code-wrapper {
      width:350px;
      height:250px;
      position:relative; /* Position must be: relative, absolute or fixed */
  }
  </style>

  <div id="my-code-wrapper" data-language="python"></div>

  <script>
    var flask = new CodeFlask;
    flask.run('#my-code-wrappers');
  </script>
</body>
```

## Credits & Thanks

CodeFlask.js was made possible by lots of pizzas and [Prism.js](https://github.com/PrismJS/prism) by [Lea Verou](http://lea.verou.me/).
