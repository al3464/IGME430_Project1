const fs = require('fs');
const path = require('path');
// loaded into memory and parsed at server startu
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
    if (request.method !== 'HEAD') {
        response.write(content);
    }

    response.end();

};

const addCat = (request, response) => {
    // create remind input message for response
    const responseJSON = {
        message: 'Name and age and date are required.',
    };

    // grab  out of request.body for convenience
    // If either name or age do not exist in the request,
    // they will be set to undefined
    const { name, age, catBirth, breed } = request.body;

    // We might want more validation than just checking if they exist
    // This could easily be abused with invalid types (such as booleans, numbers, etc)
    // If either are missing, send back an error message as a 400 badRequest
    if (!name || !age || !catBirth) {
        responseJSON.id = 'missingParams';
        return respondJSON(request, response, 400, responseJSON);
    }

    // add or update fields for this user name
    cats[name] = { name, age, catBirth, breed };
    // if response is created, then set our created message
    // and sent response with a messageß
    return respondJSON(request, response, 201, {
        message: 'Created Successfully',
        cat: cats[name],
    });

}


const updateCat = (request, response) => {
    //almost same content with addCat but this function used 
    //for update repeat cat's name's information updated(exist cat card's fixed)
    const responseJSON = {
        message: 'Name and age are both required.',
    };

    const { name, age, catBirth, breed } = request.body;

    if (!name || !age || !catBirth) {
        responseJSON.id = 'missingParams';
        return respondJSON(request, response, 400, responseJSON);
    }


    if (cats[name]) {
        responseJSON.id = 'cat already exist'
        // When we send back a 204 status code, it will not send response
        // body. However, if we didn't pass in an object as the 4th param
        // to our respondJSON function it would break. So we send in an
        // empty object, which will stringify to an empty string.
        return respondJSON(request, response, 204, {});

    }

}

// get cat's object
const getCats = (request, response, parsedUrl) => {
    const ageFilter = parsedUrl.searchParams.get('age');
    // json object to send
    const responseJSON = {
        cats,
    };

    //set query params to make a basic age filter for url 
    if (ageFilter) {
        //Using cats[key], you can access the corresponding cat object 
        //and check whether the cat's age meets the filter condition.
        let result = {};
        for (let key in cats) {
            if (cats[key].age === ageFilter) {
                result[key] = cats[key];
            }
        }

        return respondJSON(request, response, 200, { cats: result });

    } else {
        // return 200 with message
        return respondJSON(request, response, 200, responseJSON);
    }

    

};

//any wrong input for url will return this 
const getNotFound = (request, response) => {
    // create error message for response
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