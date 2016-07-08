import semver from 'semver';
import fetch from 'node-fetch';

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

export function getLatestReleases () {
  const options = { headers: {
    'Accept': 'application/vnd.github.v3+json'
  }};
  return fetch('https://api.github.com/repos/gregstewart/hearthstone-tracker/releases/latest', options)
    .then((response) => {
      return response.json();
    });
}

export function shouldUpdate (version, latestVersion) {
  return semver.lt(version, latestVersion);
}

export function darwin (currentVerion) {
  return getLatestReleases().then((latestRelease) => {
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
