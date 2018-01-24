module.exports = () => {  // Inject dependencies here

  return (req, res) => {
    console.log(`Items ${req.params.id} in resource ${req.params.resource}`);
    let repository = require('./documentRepository.js')(req.params.resource);

    repository.getById(req.params.id).then(data => {
      if (data == null) {
        res.status(404).send();
      } else {
        res.send(data);
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
  }
}