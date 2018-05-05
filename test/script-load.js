const fs = require('fs');

const script = fs.readFileSync(__dirname + '/../build/codeflask.min.js', 'utf8');
let html = fs.readFileSync(__dirname + '/e2e/test.html', 'utf8');

html = html.replace('#SCRIPT_LOADS_HERE#', script);

fs.writeFileSync(__dirname + '/e2e/test.html', html, {encoding: 'utf8'});