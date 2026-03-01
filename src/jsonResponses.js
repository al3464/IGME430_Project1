const fs = require('fs');
const path = require('path');
const dataPath = path.join(`${__dirname}/../CatsData/cat.json`);
let cats = {};
try {
  cats = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
} catch (err) {
  console.error('cats is not loaded, loaded failed.');
}

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
        message: 'Name and age and date are required.',
      };

      const {name, age, catBirth, breed} = request.body;
     
      if (!name || !age || !catBirth) {
        responseJSON.id = 'missingParams';
        return respondJSON(request, response, 400, responseJSON);
      }
 
   // add or update fields for this user name
  
   cats[name] = { name, age, catBirth, breed };
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
 
    
  if (cats[name]) {
      responseJSON.id = 'cat already exist'
    // Set the status code to 201 (created) and create an empty user
    return respondJSON(request, response, 204, responseJSON);

  }

}

// get cat's object
// should calculate a 200
const getCats = (request, response, parsedUrl) => {
    const ageFilter = parsedUrl.searchParams.get('age');
    // json object to send
    const responseJSON = {
        cats,
    };

   
    if (ageFilter) {
        
            let result = Object.fromEntries(
            Object.entries(cats).filter(entry => {
            const cat = entry[1];
            return cat.age === ageFilter;
        })
        )

        return respondJSON(request, response, 200, {cats: result});

      }else{
            return respondJSON(request, response, 200, responseJSON);
      }
      
    // return 200 with message
  
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