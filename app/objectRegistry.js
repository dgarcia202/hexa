const configuration = require('../configuration.js');

const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;

function getDatabaseUrl() {
  return `mongodb://${configuration.database.host}:${configuration.database.port}`;
}

function schema2DbFormat(schemaObj) {
  if (Object.getOwnPropertyNames(schemaObj).includes('$schema')) {
    schemaObj._schema = schemaObj.$schema;
    delete schemaObj.$schema;
  }
  return schemaObj;
}

function dbFormat2Schema(dbFormat) {
  delete dbFormat._id;
  if (Object.getOwnPropertyNames(dbFormat).includes('_schema')) {
    dbFormat.$schema = dbFormat._schema;
    delete dbFormat._schema;
  }
  return dbFormat;
}

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
      });

      // Opens connection with database.
      let client = null;
      let db = null;
      let existingCollectionNames = [];
      MongoClient.connect(getDatabaseUrl()).then(x => {
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
          promises.push(db.collection(configuration.objectRegistryCollectionName).insertOne(schema2DbFormat(x)));
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
    MongoClient.connect(getDatabaseUrl()).then(x => {
      client = x;
      db = client.db(configuration.database.name);
      return db.collection(configuration.objectRegistryCollectionName).findOne({ id: id });
    })
    .then(data => {
      // Dispose database connection.
      client.close();
      resolve(dbFormat2Schema(data));
    })  
    .catch(err => {
      reject(err);
    });
  })
};

module.exports.getAllDefinitions = () => {
  return new Promise((resolve, reject) => {
    // Opens connection with database.
    let client = null;
    let db = null;
    MongoClient.connect(getDatabaseUrl()).then(x => {
      client = x;
      db = client.db(configuration.database.name);
      return db.collection(configuration.objectRegistryCollectionName).find({}).toArray();
    })
    .then(data => {
      client.close();
      resolve(data.map(dbFormat2Schema));
    })  
    .catch(err => {
      reject(err);
    });
  })
};