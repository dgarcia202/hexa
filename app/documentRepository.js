const configuration = require('../configuration.js');

const MongoClient = require('mongodb').MongoClient,
      ObjectID = require('mongodb').ObjectID;

module.exports = (resourceName) => {

  function getAllDocumentsInCollection(collection) {
    return new Promise((resolve, reject) => {
      let client = null;
      MongoClient.connect(`mongodb://${configuration.database.host}:${configuration.database.port}`).then(x => {
        client = x;
        db = client.db(configuration.database.name);
        return db.collection(collection).find({}).toArray();
      })
      .then(data => {
        client.close();
        console.log("MongoDb connection closed");  
        resolve(data);
      })
      .catch(err => {
        reject(err);
      })
    });
  }

  function getDocumentById(collection, id) {
    return new Promise((resolve, reject) => {
      let client = null;
      MongoClient.connect(`mongodb://${configuration.database.host}:${configuration.database.port}`).then(x => {
        client = x;
        db = client.db(configuration.database.name);
        return db.collection(collection).find({ _id: new ObjectID(id)}).next();
      })
      .then(object => {
        client.close();
        console.log("MongoDb connection closed");  
        resolve(object);
      })
      .catch(err => {
        reject(err);
      })
    });    
  }

  return {
    getAll: () => getAllDocumentsInCollection(resourceName),
    getById: (id) => getDocumentById(resourceName, id)
  };
}

