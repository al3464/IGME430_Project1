const fs = require('fs');

const catImages = {
    default: fs.readFileSync(`${__dirname}/../Cats/Default.jpg`),
    ragdoll: fs.readFileSync(`${__dirname}/../Cats/Ragdoll.jpg`),
    bengal: fs.readFileSync(`${__dirname}/../Cats/Bengal.jpg`),
    amShorthair:fs.readFileSync(`${__dirname}/../Cats/AmShorthair.jpg`),
    scottishFold:fs.readFileSync(`${__dirname}/../Cats/ScottishFold.jpg`),
    sphynx: fs.readFileSync(`${__dirname}/../Cats/Sphynx.jpg`),
    maine: fs.readFileSync(`${__dirname}/../Cats/Maine.jpg`),
    siamese:fs.readFileSync(`${__dirname}/../Cats/Siamese.jpg`),
    exoticShorthair:fs.readFileSync(`${__dirname}/../Cats/ExoticShorthair.jpg`),
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
    
    response.writeHead(200, { 'Content-Type': 'image/jpg' });
    response.write(imageData);
    response.end();
  };



module.exports = {
    getDefault: (req, res) => sendImage(req, res, 'default'),
    getRagdoll: (req, res) => sendImage(req, res, 'ragdoll'),
    getAmShorthair: (req, res) => sendImage(req, res, 'amShorthair'),
    getScottishFold: (req, res) => sendImage(req, res, 'scottishFold'),
    getSphynx: (req, res) => sendImage(req, res, 'sphynx'),
    getMaine: (req, res) => sendImage(req, res, 'maine'),
    getBengal: (req, res) => sendImage(req, res, 'bengal'),
    getExoticShorthair: (req, res) => sendImage(req, res, 'exoticShorthair'),
    getSiamese: (req, res) => sendImage(req, res, 'siamese'),
  };