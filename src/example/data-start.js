export default [
  {
    text: "Programs",
    icon: "programs",
    items: [
      {
        text: "Road Blocks",
        icon: "default",
        appProps: {
          app: "Webview",
          title: "Road Blocks",
          src: "https://roadblocks.ash.ms/game/"
        }
      },
      { text: "Explorer", icon: "explorer", appProps: { app: "Explorer" } },
      {
        text: "Paint",
        icon: "paint",
        appProps: {
          title: "Paint",
          app: "Webview",
          src: "https://jspaint.app/"
        }
      }
    ]
  },
  { text: "Documents", icon: "documents" },
  { text: "Settings", icon: "settings" },
  { text: "Search", icon: "search" },
  { text: "Help", icon: "help" },
  { text: "Run", icon: "run" },

  "divider",
  { text: "Log off", icon: "log-off" },
  { text: "Shut Down", icon: "shutdown" }
];
