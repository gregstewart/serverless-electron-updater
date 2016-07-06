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

export function darwin (currentVerion, fetch, github) {
  return getLatestReleases(github).then((releases) => {
    console.log(releases); /* eslint no-console: 0 */
  });
}
