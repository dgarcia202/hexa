module.exports = () => {  // Inject dependencies here

  return (req, res) => {
    console.log(`Inserting new item in resource ${req.params.resource}`);
    let repository = require('./documentRepository.js')(req.params.resource);

    repository.insert(req.body).then(data => {
      res.status(201).send(data);      
    })
    .catch(err => {
      res.status(500).send(err);
    });
  }
}