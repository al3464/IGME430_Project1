const http = require('http');

const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');
const cssHandler = require('./cssResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
  console.log(request.url);
  switch (request.url) {
    case '/':
      htmlHandler.getIndex(request, response);
      break;
    case '/style.css':
      cssHandler.getCss(request, response);
      break;
    case '/success':
      jsonHandler.success(request, response);
      break;
    case '/badRequest':
      jsonHandler.badRequest(request, response);
      break;
    case '/badRequest?valid=true':
      jsonHandler.badRequestTrue(request, response);
      break;
    case '/unauthorized':
      jsonHandler.unauthorized(request, response);
      break;
    case '/unauthorized?loggedIn=yes':
      jsonHandler.unauthorizedYes(request, response);
      break;
    case '/forbidden':
      jsonHandler.forbidden(request, response);
      break;
    case '/internal':
      jsonHandler.internal(request, response);
      break;
    case '/notImplemented':
      jsonHandler.notImplemented(request, response);
      break;
    case '/anythingElse':
      jsonHandler.anythingElse(request, response);
      break;
    default:
      htmlHandler.getIndex(request, response);
      break;
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
