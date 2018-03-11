const sinon = require('sinon');
const assert = require('chai').assert;

describe('API list route handler', () => {
  it ('returns list of items in resource', () => {

    // arrange
    const responseBody = [ {}, {} ];
    let repoBuilderStub = sinon.stub().returns();
    // const repositoryBuilder = require('../app/repositoryBuilder.js');
    // sinon.stub(repositoryBuilder, 'getAll').returns(responseBody);

    const sut = require('../app/apiListHandler.js')(repositoryBuilder);
    let req = { params: { resource: 'resource' }};
    let res = { send: sinon.spy() };

    // act
    sut(req, res);

    // assert
    assert(res.send.calledWith(responseBody));
  })
});