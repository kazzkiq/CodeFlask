

var chalk = require('chalk');
var Table = require('cli-table');


var TABLE_CELL_SPLIT = '^*||*^';
var TABLE_ROW_WRAP = '*|*|*|*';
var TABLE_ROW_WRAP_REGEXP = new RegExp(escapeRegExp(TABLE_ROW_WRAP), 'g');

function Renderer(options) {
  this.options = options || {};
}

Renderer.prototype.code = function(code, lang, escaped) {
  return '\n' + chalk.yellow(indentify(code)) + '\n\n';
};

Renderer.prototype.blockquote = function(quote) {
  return '\n' + chalk.gray.italic(indentify(quote.trim())) + '\n\n';
};

Renderer.prototype.html = function(html) {
  return html;
};

Renderer.prototype.heading = function(text, level, raw) {
  var prefix = (new Array(level + 1)).join('#');
  var base = level === 1 ? chalk.magenta.underline : chalk.green;
  return base.bold(prefix + ' ' + text) + '\n';
};

Renderer.prototype.hr = function() {
  return hr('-') + '\n';
};

Renderer.prototype.list = function(body, ordered) {
  if (ordered) {
    return changeToOrdered(body) + '\n';
  }
  return body + '\n';
};

Renderer.prototype.listitem = function(text) {
  return tab() + '* ' + text + '\n';
};

Renderer.prototype.paragraph = function(text) {
  return text + '\n\n';
};

Renderer.prototype.table = function(header, body) {
  var table = new Table({
      head: generateTableRow(header)[0]
  });
  generateTableRow(body).forEach(function (row) {
    table.push(row);
  });
  return table.toString() + '\n';
};

Renderer.prototype.tablerow = function(content) {
  return TABLE_ROW_WRAP + content + TABLE_ROW_WRAP + '\n';
};

Renderer.prototype.tablecell = function(content, flags) {
  return content + TABLE_CELL_SPLIT;
};

// span level renderer
Renderer.prototype.strong = function(text) {
  return chalk.bold(text);
};

Renderer.prototype.em = function(text) {
  return chalk.italic(text);
};

Renderer.prototype.codespan = function(text) {
  return chalk.yellow(text);
};

Renderer.prototype.br = function() {
  return '\n';
};

Renderer.prototype.del = function(text) {
  return chalk.dim.gray.strikethrough(text);
};

Renderer.prototype.link = function(href, title, text) {
  if (this.options.sanitize) {
    try {
      var prot = decodeURIComponent(unescape(href))
        .replace(/[^\w:]/g, '')
        .toLowerCase();
    } catch (e) {
      return '';
    }
    if (prot.indexOf('javascript:') === 0) {
      return '';
    }
  }

  var out = '';
  if (text) out += text + ' (';
  out +=  href;
  if (text) out += ')';

  return chalk.blue.underline(out);
};

Renderer.prototype.image = function(href, title, text) {
  var out = '!['+text;
  if (title) out += ' – ' + title;
  return out + '](' + href + ')\n';
};

module.exports = Renderer;


function changeToOrdered(text) {
  var i = 1;
  return text.split('\n').reduce(function (acc, line) {
    if (!line) return acc;
    return acc + tab() + (i++) + '.' + line.substring(tab().length + 1) + '\n';
  }, '');
}


function hr(inputHrStr) {
  return (new Array(process.stdout.columns)).join(inputHrStr);
}

function tab(size) {
  size = size || 4;
  return (new Array(size)).join(' ');
}

function indentify(text) {
  if (!text) return text;
  return tab() + text.split('\n').join('\n' + tab());
}

function generateTableRow(text) {
  if (!text) return [];
  var lines = text.split('\n');

  var data = [];
  lines.forEach(function (line) {
    if (!line) return;
    var parsed = line.replace(TABLE_ROW_WRAP_REGEXP, '').split(TABLE_CELL_SPLIT);

    data.push(parsed.splice(0, parsed.length - 1));
  });
  return data;
}

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
