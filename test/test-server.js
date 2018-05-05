const micro = require('micro');
const fs = require('fs');

const server = micro(async (req, res) => {
  const url = req.url;
  switch (url) {
    case '/':
      return fs.readFileSync(__dirname + '/e2e/test.html', 'utf8');
    break;

    case '/codeflask.min.js':
      return fs.readFileSync(__dirname + '/../build/codeflask.min.js', 'utf8');
    break;

    default: 
      return '404';
    break;
  }
});

server.listen(8888);
