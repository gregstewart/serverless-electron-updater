import handler from '../../../functions/update/handler';
import { latestRelease } from '../../fixtures/github-responses.js';
import chai from 'chai';
import sinon from 'sinon';
import nock from 'nock';

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

  it('update/darwin/1.0.0 is called and callback is invoked', (done) => {
    const callback = sinon.spy();
    const release  = JSON.parse(latestRelease);
    const expected = {
      "url": release.assets[0].browser_download_url,
      "name": release.name,
      "notes":release.body,
      "pub_date": release.published_at
    };

    nock('https://api.github.com/')
      .get('/repos/gregstewart/hearthstone-tracker/releases/latest')
      .reply(200, latestRelease);

    handler({platform: 'darwin', version: '0.0.1'},{}, callback);

    setTimeout(() => {
      expect(callback).to.have.been.calledWith(null, expected);
      done();
    }, 10);
  });
});
