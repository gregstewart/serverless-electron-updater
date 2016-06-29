import handler from '../../../functions/update/handler';
import chai from 'chai';
import sinon from 'sinon';

chai.use(require('sinon-chai'));
const expect = chai.expect;

describe('Update endpoint', () => {
  it('update/ is called and callback is invoked', () => {
    const callback = sinon.spy();

    handler({},{}, callback);

    expect(callback).to.have.been.calledWith(null, {
      message: 'Go Serverless! Your Lambda function executed successfully!'
    });
  });

  it('update/darwin/1.0.0 is called and callback is invoked', () => {
    const callback = sinon.spy();

    handler({platform: 'darwin', version: '1.0.0'},{}, callback);

    expect(callback).to.have.been.calledWith(null, {
      message: 'Go Serverless! Your Lambda function executed successfully with platform: darwin and version: 1.0.0!'
    });
  });
});
