// eslint-disable-next-line unicorn/prefer-node-protocol
const http = require('http');
// eslint-disable-next-line unicorn/prefer-node-protocol
const fs = require('fs');

const host = 'localhost';
const port = 3000;

const requestListener = function (req, res) {
  let sitePath = '/Public' + req.url;
  if (sitePath === '/Public/') {
    sitePath = '/Public/index.html';
  }
  console.log(__dirname + sitePath);
  fs.readFile(__dirname + sitePath, function (error, content) {
    if (error) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('Site Not Found');
    } else {
      res.writeHead(200);
      res.end(content);
    }
  });
};

const server = http.createServer(requestListener);

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
