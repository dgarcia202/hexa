const validator = require('./validator.js');

module.exports = () => {  // Inject dependencies here
  return (req, res, next) => {
    console.log(`Validating content for resource ${req.params.resource}`);
    validator.validate(req.params.resource, req.body).then(result => {
      if (result.errors.length == 0) {
        next();
      } else {
        res.status(400).send(result.errors);
      }
    })
    .catch(err => {
      res.status(500).send(err);
    });
  }
};