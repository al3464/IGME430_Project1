const fs = require('fs');

const catImages = {
    default: fs.readFileSync(`${__dirname}/../Cats/Default.png`),
    ragdoll: fs.readFileSync(`${__dirname}/../Cats/Ragdoll.png`),
    //bengal: fs.readFileSync(`${__dirname}/../Cats/Bengal.png`),
    amShorthair:fs.readFileSync(`${__dirname}/../Cats/AmShorthair.png`),
    maine: fs.readFileSync(`${__dirname}/../Cats/Maine.png`),
    siamese:fs.readFileSync(`${__dirname}/../Cats/Siamese.png`)
}


// pull in the file system module
const sendImage = (request, response, imageKey) => {
    const imageData = catImages[imageKey];
    if (!imageData) {
      response.writeHead(404, { 'Content-Type': 'text/plain' });
      response.write('Image not found');
      response.end();
      return;
    }
    
    response.writeHead(200, { 'Content-Type': 'image/png' });
    response.write(imageData);
    response.end();
  };



module.exports = {
    getDefault: (req, res) => sendImage(req, res, 'default'),
    getRagdoll: (req, res) => sendImage(req, res, 'ragdoll'),
    getAmShorthair: (req, res) => sendImage(req, res, 'amShorthair'),
    getMaine: (req, res) => sendImage(req, res, 'maine'),
    getSiamese: (req, res) => sendImage(req, res, 'siamese'),
  };