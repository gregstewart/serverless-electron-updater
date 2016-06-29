export function getReleases (github) {
  return new Promise((resolve, reject) => {
    github.repos.getReleases({
      user: "gregstewart",
      repo: "hearthstone-tracker",
      page: 1
    }, (err, releases) => {
      if (err) {
        return reject(err);
      }

      return resolve(releases);
    });
  });
}

export function darwin (currentVerion, fetch, github) {
  return getReleases(github).then((releases) => {
    console.log(releases); /* eslint no-console: 0 */
  });
}
