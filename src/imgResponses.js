const fs = require('fs');
// pull in the file system module
const image = fs.readFileSync(`${__dirname}/../Cats/Default.png`);
const image2 = fs.readFileSync(`${__dirname}/../Cats/Ragdoll.png`);

const getImage = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'image/png' });
  response.write(image);
  response.end();
};

const getRagdoll = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'image/png' });
    response.write(image2);
    response.end();
  };

module.exports ={
    getImage,
    getRagdoll,
}