import semver from 'semver';
import GitHubApi from 'github';

const patterns = {
  darwin: {
    dmg: /-(osx|darwin).*?\.dmg/,
    zip: /-(osx|darwin).*?\.zip/
  },
  win32: {
    installer: /-win32-setup\.exe/,
    zip: /-win32-portable\.zip/
  }
};

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

export function darwin (currentVerion) {
  const github = new GitHubApi();
  return getLatestReleases(github).then((latestRelease) => {
    if (shouldUpdate(currentVerion, latestRelease.tag_name)) {
      const asset = latestRelease.assets.find((a) => { if (a.name.match(patterns.darwin.zip)) return true; });

      if(asset) {
        return JSON.stringify({
          url: asset.browser_download_url,
          name: latestRelease.name,
          notes: latestRelease.body,
          pub_date: latestRelease.published_at
        });
      }

      return true;
    }

    return false;
  });
}
