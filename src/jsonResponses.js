// function to send a json object
const respondJSON = (request, response, status, object) => {
  // set status code and content type (application/json)
  response.writeHead(status, {
    'Content-Type': 'application/json',
  });
  // stringify the object (so it doesn't use references/pointers/etc)
  // but is instead a flat string object.
  // Then write it to the response.
  response.write(JSON.stringify(object));
  // Send the response to the client
  response.end();
};

// function to show a success status code
const success = (request, response) => {
  // message to send
  const responseJSON = {
    message: 'This is a successful response',
    title: 'Success',
  };

  // send our json with a success status code
  respondJSON(request, response, 200, responseJSON);
};

const badRequest = (request, response) => {
  // message to send
  const responseJSON = {
    message: 'Missing valid query parameter set to true',
    title: 'Bad Request',
    id: 'bad Request',
  };

  // send our json with a success status code
  respondJSON(request, response, 400, responseJSON);
};

const badRequestTrue = (request, response) => {
  // message to send
  const responseJSON = {
    message: 'This request has the required parameters',

  };

  // send our json with a success status code
  respondJSON(request, response, 400, responseJSON);
};

const unauthorized = (request, response) => {
  // message to send
  const responseJSON = {
    message: 'Missing loggedIn query parameter set to yes',
    title: 'Unauthorized',
  };

  // send our json with a success status code
  respondJSON(request, response, 401, responseJSON);
};

const unauthorizedYes = (request, response) => {
  // message to send
  const responseJSON = {
    message: 'You have successfully viewed the content.',
  };

  // send our json with a success status code
  respondJSON(request, response, 401, responseJSON);
};

const forbidden = (request, response) => {
  // message to send
  const responseJSON = {
    message: 'You do not have access to this content.',
    id: 'forbidden',
    title: 'Forbidden',
  };

  // send our json with a success status code
  respondJSON(request, response, 403, responseJSON);
};

const internal = (request, response) => {
  // message to send
  const responseJSON = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internalError',
    title: 'Internal',
  };

  // send our json with a success status code
  respondJSON(request, response, 500, responseJSON);
};

const notImplemented = (request, response) => {
  // message to send
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
    title: 'notImplemented',
  };

  // send our json with a success status code
  respondJSON(request, response, 500, responseJSON);
};

const anythingElse = (request, response) => {
  // message to send
  const responseJSON = {
    message: 'The page you are looking for was not found',
    id: 'notFound',
    title: 'Resource Not Found',
  };

  // send our json with a success status code
  respondJSON(request, response, 500, responseJSON);
};

module.exports = {
  success,
  badRequest,
  badRequestTrue,
  unauthorized,
  unauthorizedYes,
  forbidden,
  internal,
  notImplemented,
  anythingElse,
};
