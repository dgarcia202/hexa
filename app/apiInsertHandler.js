module.exports = (repositoryBuilder) => {  // Inject dependencies here

  return (req, res) => {
    console.log(`Inserting new item in resource ${req.params.resource}`);
    let repository = repositoryBuilder(req.params.resource);

    repository.insert(req.body).then(result => {
      res.status(201).send(result.data);      
    })
    .catch(err => {
      res.status(500).send(err);
    });
  }
}