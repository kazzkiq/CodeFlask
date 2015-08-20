# CodeFlask.js
A micro code-editor for awesome web pages.

<img width="983" alt="CodeFlask.js" src="https://cloud.githubusercontent.com/assets/1953194/9321840/ed0eb022-4541-11e5-9390-30f7dfff82e1.png">

## About

CodeFlask.js lets you easily and effortless put an code-editor to your web page.

It was made as an attempt to create a leaner editor for simple purposes. Just a few lines of code and you're ready to play with code in the browser.

If you want a robust web code editor you can check projects that aim that big, such as CodeMirror.


## Usage

In order to use CodeFlask.js you need also import [Prism.js](https://github.com/PrismJS/prism) (for code highlight) into your project. Prism basically uses two files, an `.js` file and an `.css` one (where you can theme the code syntax).

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

Alternatively, you can call a language directly on your function call:

```javascript
var flask = new CodeFlask;
flask.run('#my-code-wrapper', { language: 'javascript' })
```

 It is important to remember that CodeFlask.js checks primarily for `data-language` attribute, then for the function call version. If none of those are declared, the editor will render by default with **HTML syntax**;

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

## Credits & Thanks

Made in Rio.

CodeFlask.js was made possible and have dependency on [Prism.js](https://github.com/PrismJS/prism) by [Lea Verou](http://lea.verou.me/).
