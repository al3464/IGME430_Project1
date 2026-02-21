const http = require('http');
const htmlHandler = require('./htmlResponses.js');
const cssHandler = require('./cssResponses.js');
const jsonHandler = require('./jsonResponses.js');
const imgHandler = require('./imgResponses.js');
const query = require('querystring');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const parseBody = (request, response, handler) => {
  // The request will come in in pieces. We will store those pieces in this
  // body array.
  const body = [];

  // The body reassembly process is event driven, much like when we are streaming
  // media like videos, etc. We will set up a few event handlers. This first one
  // is for if there is an error. If there is, write it to the console and send
  // back a 400-Bad Request error to the client.
  request.on('error', (err) => {
    console.dir(err);
    response.statusCode = 400;
    response.end();
  });

  // The second possible event is the "data" event. This gets fired when we
  // get a piece (or "chunk") of the body. Each time we do, we will put it in
  // the array. We will always recieve these chunks in the correct order.
  request.on('data', (chunk) => {
    body.push(chunk);
  });

  // The final event is when the request is finished sending and we have recieved
  // all of the information. When the request "ends", we can proceed. Turn the body
  // array into a single entity using Buffer.concat, then turn that into a string.
  // Once we have that string, we can check the request's content-type header to see
  // if it is in URL Encoded or JSON format, and parse it properly. If it's in neither
  // we can send back an error to the user.
  request.on('end', () => {
    const bodyString = Buffer.concat(body).toString();
    const type = request.headers['content-type'];
    if(type === 'application/x-www-form-urlencoded') {
      request.body = query.parse(bodyString);
    } else if (type === 'application/json') {
      request.body = JSON.parse(bodyString);
    } else {
      response.writeHead(400, { 'Content-Type': 'application/json' });
      response.write(JSON.stringify({ error: 'invalid data format' }));
      return response.end();
    }

    // Once we have the bodyParams object, we will call the handler function. We then
    // proceed much like we would with a GET request.
    handler(request, response);
  });
};



const handlePost = (request, response, parsedUrl) => {
    // If they go to /addUser
    if (parsedUrl.pathname === '/addCat') {
      // Call our below parseBody handler, and in turn pass in the
      // jsonHandler.addUser function as the handler callback function.
      parseBody(request, response, jsonHandler.addCat);
    }
  };

  const urlStruct = {
    '/': htmlHandler.getIndex,
    '/style.css': cssHandler.getCssFile,
    '/default': imgHandler.getDefault,
    '/ragdoll': imgHandler.getRagdoll,
    '/siamese': imgHandler.getSiamese,
    notFound: htmlHandler.getIndex,

  }
  
 

  const onRequest = (request, response) => {
    console.log(request.url);
    const protocol = request.connection.encrypted ? 'https' : 'http';
    const parsedUrl = new URL(request.url, `${protocol}://${request.headers.host}`);
    if (request.method === 'POST') {
        handlePost(request, response, parsedUrl);
      } else {
        //handleGet(request, response, parsedUrl);
        const handler = urlStruct[parsedUrl.pathname];
        if (handler) {
          //pass in correct url
          handler(request, response, parsedUrl);
        } else {
          // any invalid input will trigger notFound
          urlStruct.notFound(request, response, parsedUrl);
        }
      }
}

http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1 : ${port}`);
});