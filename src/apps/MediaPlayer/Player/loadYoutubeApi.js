const loadScript = require("load-script");
let loading = false;
function loadYoutubeApi() {
  return new Promise((resolve, reject) => {
    if (window.YT) return resolve(window.YT);

    // Set a callback (preserving previous callbacks if set)
    const previousCallback = window.onYouTubeIframeAPIReady || (() => {});
    window.onYouTubeIframeAPIReady = (...args) => {
      status = "ready";
      resolve(window.YT);
      previousCallback(...args);
      delete window.onYouTubeIframeAPIReady;
    };

    // Script is already loading. Wait for it.
    if (loading) return;

    // Script needs to be loaded.
    loading = true;
    loadScript("https://www.youtube.com/iframe_api", err => {
      if (err) reject(err);
    });
  });
}

export default loadYoutubeApi;
