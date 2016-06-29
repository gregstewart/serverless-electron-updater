import { darwin, getReleases } from '../../../functions/update/darwin.js';
import { releases } from '../../fixtures/github-responses.js';
import fetch from 'node-fetch';
import GitHubApi from 'github';

import nock from 'nock';
import chai from 'chai';
import sinon from 'sinon';/* eslint no-unused-vars: 0 */

chai.use(require('sinon-chai'));
const expect = chai.expect;

describe('Darwin', () => {
  let github;

  beforeEach(() => {
    github = new GitHubApi();
  });

  it.skip('calls the github api and returns payload', (done) => {
    const expected = {
      "url": "https://github.com/gregstewart/hearthstone-tracker/releases/download/v0.2.0/HearthstoneTracker-darwin-x64.zip",
      "name": "0.2.0",
      "notes": "### Notable Changes\r\n\r\n* Fixed a bug that caused...",
      "pub_date": "2016-02-02T21:51:58Z"
    };
    darwin("0.1.0", fetch, github).then((result) => {
      expect(result).to.deep.equal(expected);
      done();
    });
  });

  describe('getReleases', () => {
    it('returns releases from github', (done) => {
      nock('https://api.github.com/')
        .get('/repos/gregstewart/hearthstone-tracker/releases?page=1')
        .reply(200, releases);

      getReleases(github).then((result) => {
        expect(result.length).to.equal(JSON.parse(releases).length);
        expect(result).to.have.all.keys('0', '1', '2', 'meta');
        done();
      }).catch((error) => {
        expect(error).to.be.undefined;
        done();
      });
    });
  });
});
