import handler from '../../../functions/update/handler';
import chai from 'chai';
import sinon from 'sinon';

chai.use(require('sinon-chai'));
const expect = chai.expect;

describe('Update endpoint', () => {
  it('callback is invoked', () => {
    const callback = sinon.spy();

    handler({},{}, callback)

    expect(callback).to.have.been.calledWith(null, {
      message: 'Go Serverless! Your Lambda function executed successfully!'
    });
  });
})
