const configuration = require('../configuration.js');

const MongoClient = require('mongodb').MongoClient,
      ObjectID = require('mongodb').ObjectID;

module.exports = (resourceName) => {

  function getDatabaseUrl() {
    return `mongodb://${configuration.database.host}:${configuration.database.port}`;
  }

  function getAllDocuments(collection) {
    return new Promise((resolve, reject) => {
      let client = null;
      MongoClient.connect(getDatabaseUrl()).then(x => {
        client = x;
        let db = client.db(configuration.database.name);
        return db.collection(collection).find({}).toArray();
      })
      .then(items => {
        client.close();
        resolve({ count: items.length, data: items });
      })
      .catch(err => {
        reject(err);
      })
    });
  }

  function getDocumentById(collection, id) {
    return new Promise((resolve, reject) => {
      let client = null;
      MongoClient.connect(getDatabaseUrl()).then(x => {
        client = x;
        let db = client.db(configuration.database.name);
        return db.collection(collection).find({ _id: new ObjectID(id)}).next();
      })
      .then(object => {
        client.close();

        var result =  {};
        result.count = object == null ? 0 : 1;
        if (object != null) {
          result.data = object;
        }
        resolve(result);
      })
      .catch(err => {
        reject(err);
      })
    });    
  }

  function insertDocument(collection, data) {
    return new Promise((resolve, reject) => {
      let client = null;
      MongoClient.connect(getDatabaseUrl()).then(x => {
        client = x;
        let db = client.db(configuration.database.name);
        return db.collection(collection).insertOne(data);
      })
      .then(object => {
        client.close();
        resolve({ count: object.insertedCount, data: object.ops });
      })
      .catch(err => {
        reject(err);
      })
    });        
  }

  function updateDocument(collection, id, data) {
    return new Promise((resolve, reject) => {
      let client = null;
      let db = null;
      let operationCount = 0;
      MongoClient.connect(getDatabaseUrl()).then(x => {
        client = x;
        db = client.db(configuration.database.name);
        data._id = new ObjectID(id);
        return db.collection(collection).findOneAndReplace({ _id: data._id }, data);
      })
      .then(object => {
        if (object.value == null) {
          resolve({ count: 0 });
        }
        operationCount = object.lastErrorObject.n;
        return db.collection(collection).find({ _id: new ObjectID(object.value._id)}).next();
      })
      .then(savedObject => {
        client.close();
        resolve({ count: operationCount, data: savedObject });
      })
      .catch(err => {
        reject(err);
      })
    });        
  }

  function deleteDocument(collection, id) {
    return new Promise((resolve, reject) => {
      let client = null;
      MongoClient.connect(getDatabaseUrl()).then(x => {
        client = x;
        let db = client.db(configuration.database.name); 
        return db.collection(collection).deleteOne({ _id: new ObjectID(id)});
      })
      .then(object => {
        client.close();
        console.log("MongoDb connection closed");  
        resolve({ count: object.result.n });
      })
      .catch(err => {
        reject(err);
      })
    });        
  }

  return {
    getAll: () => getAllDocuments(resourceName),
    getById: (id) => getDocumentById(resourceName, id),
    insert: (data) => insertDocument(resourceName, data),
    update: (id, data) => updateDocument(resourceName, id, data),
    delete: (id) => deleteDocument(resourceName, id)
  };
}

