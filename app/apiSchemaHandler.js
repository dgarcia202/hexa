module.exports = (objectRegistry) => {
  return (req, res) => {
    console.log('Serving schema');
    objectRegistry.getAllDefinitions().then((result) => {
      res.send(result);
    })
    .catch(err => {
      res.status(500).send(err);
    });
  }
}