const configuration = require('../configuration.js');

const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;

module.exports.update = () => {
  return new Promise((resolve, reject) => {
    console.log('updating schema...');    

    fs.readdir('defs', (err, files) => {

      if (err) {
        console.log(err);
        return;
      }

      // Loads object schemas in memory.
      const objectRegistry = [];
      files.forEach(file => {
        let objectDefinition = require(`../defs/${file}`);
        objectRegistry.push(objectDefinition);
        console.log(`Added object definition for '${objectDefinition.title}'`);       
      });

      // Opens connection with database.
      let client = null;
      let db = null;
      let existingCollectionNames = [];
      MongoClient.connect(`mongodb://${configuration.database.host}:${configuration.database.port}`).then(x => {
        client = x;
        db = client.db(configuration.database.name);
        console.log("Connected successfully to MongoDb");

        // Create Object Registry Collection if it does not exists.
        return db.listCollections().toArray()
        .then(collections => {
          existingCollectionNames = collections.map(x => x.name);
          if (!existingCollectionNames.includes(configuration.objectRegistryCollectionName)) {
            console.log('Creating object registry');
            return db.createCollection(configuration.objectRegistryCollectionName);
          }
        });
      })
      .then(() => {
        // wipe all contents in Object Registry collection.
        return db.collection(configuration.objectRegistryCollectionName).deleteMany({});
      })
      .then(() => {
        // Regenerates contents in Object Registry from memory schemas.
        let promises = [];
        objectRegistry.forEach((x) => {
          console.log(`Saved schema '${x.id}'`);  

          if (Object.getOwnPropertyNames(x).includes('$schema')) {
            delete x.$schema;
          }

          promises.push(db.collection(configuration.objectRegistryCollectionName).insertOne(x));
        });
        return Promise.all(promises);
      })
      .then(() => {
        // Create collections for each object new definition.
        let promises = [];
        objectRegistry.forEach((x) => {
          if (!existingCollectionNames.includes(x.id)) {
            console.log(`creating collection '${x.id}' in database`);
            promises.push(db.createCollection(x.id));
          }
        });
        return Promise.all(promises);
      })
      .then(() => {
        // Dispose database connection.
        client.close();
        console.log("MongoDb connection closed");            
        console.log("schema updated!");
        resolve();
      })
      .catch(err => {
        reject(err);
      });
    });
  })
};

module.exports.getDefinitionById = id => {
  return new Promise((resolve, reject) => {
    // Opens connection with database.
    let client = null;
    let db = null;
    MongoClient.connect(`mongodb://${configuration.database.host}:${configuration.database.port}`).then(x => {
      client = x;
      db = client.db(configuration.database.name);
      console.log("Connected successfully to MongoDb");

      console.log(`Sendng object definition with id ${id}`);
      return db.collection(configuration.objectRegistryCollectionName).findOne({ id: id });
    })
    .then(data => {
      // Dispose database connection.
      client.close();
      console.log("MongoDb connection closed");            
      resolve(data);
    })  
    .catch(err => {
      reject(err);
    });
  })
};