# CodeFlask.js
A micro code-editor for awesome web pages.

<img width="983" alt="qqqqqqqqqq" src="https://cloud.githubusercontent.com/assets/1953194/9321840/ed0eb022-4541-11e5-9390-30f7dfff82e1.png">

## About

CodeFlask.js was made as an attempt to create a leaner code editor for simple purposes. Just a few lines of code and you're ready to play with code on your browser.

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
  <div class="my-code-wrapper" data-language="javascript"></div>
  
  <script>
    CodeFlask.run('.my-code-wrapper');
  </script>
</body>
```

----

Few things to consider:
- You can render one or multiple editors at once, e.g.: `CodeFlask.run('#lone-editor')` or `CodeFlask.run('.my-editors')`;
- You can specify an default language for all editors, e.g.: `CodeFlask.run('.my-editors', 'javascript')`.
- If you don't specify the attribute `data-language` or an default language for all editors, by default CodeFlask will render your editor as `markup` (HTML).


## Credits & Thanks

Made in Rio.

CodeFlask.js was made possible and have dependency on [Prism.js](https://github.com/PrismJS/prism) by [Lea Verou](http://lea.verou.me/).
