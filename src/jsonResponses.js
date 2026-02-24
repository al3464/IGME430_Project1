const cats = {};

const statusCodes = {
    '/success': { code: 200, message: 'This is a successful response.' },
    '/created': { code: 201, message: 'Resource created successfully.' },
    '/noContent': { code: 204, message: 'Request successful, but no content to return.' },
    '/badRequest': { code: 400, message: 'Missing valid query parameter set to true.' },
    '/unauthorized': { code: 401, message: 'Missing loggedIn query parameter.' },
    '/forbidden': { code: 403, message: 'You do not have access to this content.' },
    '/internal': { code: 500, message: 'Internal Server Error.Something went wrong.' },
    '/notImplemented': { code: 501, message: 'A get request for this page has not been implemented yet. Check again later for update content.' },
    '/notFound': { code: 404, message: 'The page you are looking for was not found.' }
  };
// takes request, response, status code and object to send
const respondJSON = (request, response, status, object) => {
    const content = JSON.stringify(object);
  
    // Headers contain our metadata. HEAD requests only get
    // this information back, so that the user can see what
    // a GET request to a given endpoint would return. Here
    // they would see what format of data (JSON) and how big
    // that data would be ('Content-Length')
    const headers = {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(content, 'utf8'),
    };
  
    // send response with json object
    response.writeHead(status, headers);
  
    // HEAD requests don't get a body back, just the metadata.
    // So if the user made one, we don't want to write the body.
    if(request.method !== 'HEAD') {
      response.write(content);
    }
    
    response.end();
  
  };

  const addCat = (request, response) => {
    const responseJSON = {
        message: 'Name and age are both required.',
      };

      const {name, age, catBirth} = request.body;
     
      if (!name || !age || !catBirth) {
        responseJSON.id = 'missingParams';
        return respondJSON(request, response, 400, responseJSON);
      }
 
   // add or update fields for this user name
  
   cats[name] = { name, age, catBirth };
   return respondJSON(request, response, 201, {
     message: 'Created Successfully',
     cat: cats[name],
   });
 
}


const updateCat = (request, response) => {
    const responseJSON = {
        message: 'Name and age are both required.',
      };

      const {name, age, catBirth} = request.body;

      if (!name || !age || !catBirth) {
        responseJSON.id = 'missingParams';
        return respondJSON(request, response, 400, responseJSON);
      }
 9
    
  if (cats[name]) {
      responseJSON.id = 'cat already exist'
    // Set the status code to 201 (created) and create an empty user
    return respondJSON(request, response, 204, responseJSON);

  }

}

// get cat's object
// should calculate a 200
const getCats = (request, response) => {
    // json object to send
    const responseJSON = {
      cats,
    };
  
    // return 200 with message
    return respondJSON(request, response, 200, responseJSON);
  };

  const getNotFound = (request, response) => {
    const responseJSON = {
        message: 'The page you are looking for was not found.',
      };
    //const acceptHeader = request.headers.accept;
   return respondJSON(request, response, 404, responseJSON);
  };

  

  module.exports = {
      addCat,
      getNotFound,
      updateCat,
      getCats,
  }