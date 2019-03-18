import playlists from "./data-youtube.json";
export default {
  "My Computer": {
    filename: "My Computer",
    icon: "default",
    appProps: {
      app: "Explorer",
      path: "/"
    }
  },
  "My Documents": {
    filename: "My Documents",
    icon: "default",
    appProps: {
      app: "Explorer",
      path: "/c:/My Documents"
    }
  },
  "Media Player": {
    filename: "Media Player",
    icon: "default",
    appProps: {
      app: "MediaPlayer",
      playlists
    }
  }
};
