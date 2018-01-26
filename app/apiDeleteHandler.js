module.exports = (repositoryBuilder) => {  // Inject dependencies here

  return (req, res) => {
    console.log(`Removing item ${req.params.id} in resource ${req.params.resource}`);
    let repository = repositoryBuilder(req.params.resource);

    repository.delete(req.params.id).then(result => {
      if (result.count == 0) {
        res.status(404).send();
      } else {
        res.send();
      } 
    })
    .catch(err => {
      res.status(500).send(err);
    });
  }
}