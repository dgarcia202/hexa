module.exports = (repositoryBuilder) => {  // Inject dependencies here

  return (req, res) => {
    console.log(`Updating item ${req.params.id} in resource ${req.params.resource}`);
    let repository = repositoryBuilder(req.params.resource);

    repository.update(req.params.id, req.body).then(result => {
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