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
    const json = window.hexoPageData.innerText;
    const [parsedJson, error] = tryParse(json);
    if (error)
      return this.explorer.openWindow("ErrorHandler", {
        title: "Could not load programs for this page",
        error,
        debugInfo: json
      });
    const hexoPageData = parsedJson;
    const { currentPage, startMenu } = hexoPageData;
    const appData = {
      startMenu,
      content: currentPage.content,
      title: currentPage.title,
      ...(currentPage.appProps || {})
    };
    this.setState({
      startMenu
    });
    if (!appData.app) {
      return this.explorer.openWindow("ErrorHandler", {
        title: "Unknown error",
        error: new Error("Could not infer app to load from URL"),
        debugInfo: JSON.stringify(appData, null, 2)
      });
    }
    console.log(JSON.stringify(appData));
    this.explorer.openWindow(appData.app, appData);
  }
  render(props) {
    return (
      <Shell
        startMenu={this.state.startMenu}
        ref={explorer => (this.explorer = explorer)}
      />
    );
  }
}

domready(() => {
  document.body.style = "overflow: hidden;";
  render(<Wrapper />, document.body);
});
