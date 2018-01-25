const objectRegistry = require('./objectRegistry.js');
const validate = require('jsonschema').validate;

module.exports.validate = (resource, data) => {
  return new Promise((resolve, reject) => {
    objectRegistry.getDefinitionById(resource).then(schema => {
      resolve(validate(data, schema));
    })
    .catch(err => {
      reject(err);
    });  
  });
};