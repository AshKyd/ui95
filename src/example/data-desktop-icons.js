import playlists from "./data-youtube.json";
export default {
  "My Computer": {
    filename: "My Computer",
    icon: "mycomputer",
    appProps: {
      app: "Explorer",
      path: "/"
    }
  },
  "My Documents": {
    filename: "My Documents",
    icon: "mydocuments",
    appProps: {
      app: "Explorer",
      path: "/c:/My Documents"
    }
  },
  "Media Player": {
    filename: "Media Player",
    icon: "video",
    appProps: {
      app: "MediaPlayer",
      playlists
    }
  }
};
