module.exports = (repositoryBuilder) => {  // Inject dependencies here

  return (req, res) => {
    console.log(`List of items in resource ${req.params.resource}`);
    let repository = repositoryBuilder(req.params.resource);

    repository.getAll().then(result => {
      res.send(result.data);
    })
    .catch(err => {
      res.status(500).send(err);
    });
  }
}