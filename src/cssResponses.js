const fs = require('fs');
// pull in the file system module

const index = fs.readFileSync(`${__dirname}/../client/style.css`);

const getCss = (request, response) => {
  response.writeHead(200, {
    'Content-Type': 'text/css',
  });
  response.write(index);
  response.end();
};

module.exports.getCss = getCss;
