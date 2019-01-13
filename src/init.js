import Shell from "./apps/shell/index.js";
import { h, render, Component } from "preact";
import domready from "domready";

function tryParse(json) {
  try {
    return [JSON.parse(json)];
  } catch (error) {
    return [null, error];
  }
}

class Wrapper extends Component {
  componentDidMount() {
    // Parse any content out of the page and send that into the shell.
    const json = window.hexoPageData.innerText;
    const [hexoPageData, error] = tryParse(json);
    if (error)
      return this.explorer.openWindow("ErrorHandler", {
        error,
        title: "Could not load programs for this page",
        debugInfo: json
      });

    // Mash up our data.
    const { currentPage, startMenu, desktopIcons } = hexoPageData;
    const appData = {
      content: currentPage.content,
      title: currentPage.title,
      ...(currentPage.appProps || {})
    };
    this.setState({
      startMenu,
      desktopIcons
    });

    // If we don't have an app to load in our payload, open an error saying so.
    if (!appData.app) {
      return this.explorer.openWindow("ErrorHandler", {
        title: "Unknown error",
        error: new Error("Could not infer app to load from URL"),
        debugInfo: JSON.stringify(appData, null, 2)
      });
    }

    // Open the specified window
    this.explorer.openWindow(appData.app, appData);
  }
  render(props) {
    // Initialise our shell app. This includes the desktop, start menu, space
    // for all the apps to be drawn in.
    return (
      <Shell
        startMenu={this.state.startMenu}
        desktopIcons={this.state.desktopIcons}
        ref={explorer => (this.explorer = explorer)}
      />
    );
  }
}

domready(() => {
  document.body.style = "overflow: hidden;";
  render(<Wrapper />, document.body);
});
