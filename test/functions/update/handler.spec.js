import handler from '../../../functions/update/handler';
import { latestRelease } from '../../fixtures/github-responses.js';
import chai from 'chai';
import sinon from 'sinon';
import nock from 'nock';

chai.use(require('sinon-chai'));
const expect = chai.expect;

describe('Update endpoint', () => {
  it('update/ is called and context.fail is invoked', () => {
    const context = {
      fail: sinon.spy()
    };

    handler({}, context);

    expect(context.fail).to.have.been.calledWith({
      code: "NoContent",
      message: "Nothing to see here"
    });
  });

  it('update/darwin/1.0.0 is called and context.done is invoked', (done) => {
    const context = {
      done: sinon.spy()
    };
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

    handler({platform: 'darwin', version: '0.0.1'}, context);

    setTimeout(() => {
      expect(context.done).to.have.been.calledWith(null, expected);
      done();
    }, 10);
  });
});
