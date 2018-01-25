module.exports = () => {  // Inject dependencies here

  return (req, res) => {
    console.log(`Items ${req.params.id} in resource ${req.params.resource}`);
    let repository = require('./documentRepository.js')(req.params.resource);

    repository.getById(req.params.id).then(result => {
      if (result.count == 0) {
        res.status(404).send();
      } else {
        res.send(result.data);
      }
    })
    .catch(err => {
      res.status(500).send(err);
    });
  }
}