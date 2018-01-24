const router = require('express').Router();

const listHandler = require('./apiListHandler.js')();
const itemHandler = require('./apiItemHandler.js')();
const insertHanlder = require('./apiInsertHandler.js')();
const deleteHandler = require('./apiDeleteHandler.js')();
const updateHandler = require('./apiUpdateHandler.js')();

router.get('/:resource', listHandler);
router.get('/:resource/:id', itemHandler);
router.post('/:resource', insertHanlder);
router.put('/:resource/:id', updateHandler);
router.delete('/:resource/:id', deleteHandler);

module.exports = router;