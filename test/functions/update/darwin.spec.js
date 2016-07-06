import { darwin, getLatestReleases } from '../../../functions/update/darwin.js';
import { latestRelease } from '../../fixtures/github-responses.js';
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

  describe('getLatestReleases', () => {
    it('returns releases from github', (done) => {
      const expectedKeys = [ 'assets',
       'assets_url',
       'author',
       'body',
       'created_at',
       'draft',
       'html_url',
       'id',
       'meta',
       'name',
       'prerelease',
       'published_at',
       'tag_name',
       'tarball_url',
       'target_commitish',
       'upload_url',
       'url',
       'zipball_url' ];
      nock('https://api.github.com/')
        .get('/repos/gregstewart/hearthstone-tracker/releases/latest')
        .reply(200, latestRelease);

      getLatestReleases(github).then((result) => {
        expect(result.length).to.equal(JSON.parse(latestRelease).length);
        expect(result).to.have.all.keys(expectedKeys);
        done();
      }).catch((error) => {
        expect(error).to.be.undefined;
        done();
      });
    });
  });
});
