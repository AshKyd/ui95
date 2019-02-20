const loadScript = require("load-script");
let loading = false;
function loadYoutubeApi() {
  return new Promise((resolve, reject) => {
    if (window.gapi) return resolve(window.gapi);

    // Set a callback (preserving previous callbacks if set)
    const previousCallback = window.loadGoogleApiCallback || (() => {});
    window.loadGoogleApiCallback = (...args) => {
      status = "ready";
      resolve(window.gapi);
      previousCallback(...args);
      delete window.loadGoogleApiCallback;
    };

    // Script is already loading. Wait for it.
    if (loading) return;

    // Script needs to be loaded.
    loading = true;
    loadScript(
      "https://apis.google.com/js/platform.js?onload=loadGoogleApiCallback",
      err => {
        if (err) reject(err);
      }
    );
  });
}

export default loadYoutubeApi;
