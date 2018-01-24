const router = require('express').Router();

const objectRegistry = require('./objectRegistry.js');

router.get('/object-defs/:id', (req, res) => {
  let id = req.params.id;
  objectRegistry.getDefinitionById(id).then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
});

router.get('/:resource', (req, res) => {
  res.send(`List of items in resource ${req.params.resource}`);
});

router.post('/:resource', (req, res) => {
  res.status(201).send(`Created item in resource ${req.params.resource}`);
});

router.get('/:resource/:id', (req, res) => {
  res.send(`List of item ${req.params.id} in resource ${req.params.resource}`);
});

module.exports = router;