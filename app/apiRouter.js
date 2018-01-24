const router = require('express').Router();

const listRoute = require('./apiListRoute.js')();
const itemRoute = require('./apiItemRoute.js')();
const insertRoute = require('./apiInsertRoute.js')();
const deleteRoute = require('./apiDeleteRoute.js')();

router.get('/:resource', listRoute);
router.get('/:resource/:id', itemRoute);
router.post('/:resource', insertRoute);
router.delete('/:resource/:id', deleteRoute);

module.exports = router;