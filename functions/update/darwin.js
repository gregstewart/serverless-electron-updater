import semver from 'semver';

export function getLatestReleases (github) {
  return new Promise((resolve, reject) => {
    github.repos.getLatestRelease({
      user: "gregstewart",
      repo: "hearthstone-tracker",
      page: 1
    }, (err, release) => {
      if (err) {
        return reject(err);
      }
      return resolve(release);
    });
  });
}

export function shouldUpdate (version, latestVersion) {
  return semver.lt(version, latestVersion);
}

export function darwin (currentVerion, fetch, github) {
  return getLatestReleases(github).then((releases) => {
    if (shouldUpdate(currentVerion, releases.tag_name)) {
      return true;
    }

    return false;
  });
}
