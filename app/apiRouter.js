const router = require('express').Router();

const listHandler = require('./apiListHandler.js')();
const itemHandler = require('./apiItemHandler.js')();
const insertHandler = require('./apiInsertHandler.js')();
const deleteHandler = require('./apiDeleteHandler.js')();
const updateHandler = require('./apiUpdateHandler.js')();
const validationHandler = require('./apiValidationHandler.js')();

router.get('/:resource', listHandler);
router.get('/:resource/:id', itemHandler);
router.post('/:resource', [validationHandler, insertHandler]);
router.put('/:resource/:id', [validationHandler, updateHandler]);
router.delete('/:resource/:id', deleteHandler);

module.exports = router;