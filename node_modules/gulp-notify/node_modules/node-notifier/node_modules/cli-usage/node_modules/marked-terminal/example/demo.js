var marked = require('marked');
var fs = require('fs');
var TerminalRenderer = require('../');

// Example showing usage information from a CLI tool.

marked.setOptions({
  // Define custom renderer
  renderer: new TerminalRenderer()
});

// Show the parsed data
console.log(marked(fs.readFileSync(__dirname + "/usage.md").toString()));