var marked = require('marked');
var TerminalRenderer = require('../');

marked.setOptions({
  // Define custom renderer
  renderer: new TerminalRenderer()
});

// Show the parsed data
console.log(marked('# Hello \nThis is **markdown** printed in the `terminal`'));
