const router = require('express').Router();

const listRoute = require('./apiListRoute.js')();
const itemRoute = require('./apiItemRoute.js')();

router.get('/:resource', listRoute);
router.get('/:resource/:id', itemRoute);

router.post('/:resource', (req, res) => {
  res.status(201).send(`Created item in resource ${req.params.resource}`);
});

module.exports = router;