module.exports = () => {  // Inject dependencies here

  return (req, res) => {
    console.log(`Updating item ${req.params.id} in resource ${req.params.resource}`);
    let repository = require('./documentRepository.js')(req.params.resource);

    repository.update(req.params.id, req.body).then(value => {
      if (value == null) {
        res.status(404).send();
      } else {
        res.send(value);
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
  }
}