const fs = require('fs'); //pull in the file system module
const index = fs.readFileSync(`${__dirname}/../client/index.html`);
const index2 = fs.readFileSync(`${__dirname}/../client/documentation.html`);

const getIndex = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(index);
    response.end();
};

const getDocumentation = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(index2);
    response.end();
};

module.exports = {
    getIndex,
    getDocumentation,
}