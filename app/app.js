const express = require('express');
const app = express();

const configuration = require('../configuration.js');
const objectRegistry = require('./objectRegistry.js');
const apiRouter = require('./apiRouter.js');

objectRegistry.update().then(() => {
  app.use('/api', apiRouter);
  app.listen(configuration.api.port, () => console.log(`Example app listening on port ${configuration.api.port}!`));
});
