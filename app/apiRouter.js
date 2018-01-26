const router = require('express').Router();

const repositoryBuilder = require('./repositoryBuilder.js');
const validator = require('./validator.js');

const listHandler = require('./apiListHandler.js')(repositoryBuilder);
const itemHandler = require('./apiItemHandler.js')(repositoryBuilder);
const insertHandler = require('./apiInsertHandler.js')(repositoryBuilder);
const deleteHandler = require('./apiDeleteHandler.js')(repositoryBuilder);
const updateHandler = require('./apiUpdateHandler.js')(repositoryBuilder);
const validationHandler = require('./apiValidationHandler.js')(validator);

router.get('/:resource', listHandler);
router.get('/:resource/:id', itemHandler);
router.post('/:resource', [validationHandler, insertHandler]);
router.put('/:resource/:id', [validationHandler, updateHandler]);
router.delete('/:resource/:id', deleteHandler);

module.exports = router;