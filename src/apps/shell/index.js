import Desktop from "../../components/desktop/index.js";
import Window from "../../components/window/index.js";
import WindowArea from "../../components/windowarea/index.js";
import Taskbar from "../../components/taskbar/index.js";
import Button from "../../components/button/index.js";
import StartMenu from "../../components/startmenu/index.js";
import FileIcons from "../../components/desktop/fileicons/index.js";
import Toolbar from "../../components/toolbar/index.js";
import { h, render, Component } from "preact";

class Shell extends Component {
  constructor(props) {
    super();
    this.state = {
      fs: props.fs,
      windows: [],
      startMenu: props.startMenu || [],
      desktopIcons: props.desktopIcons || {},
      defaultTitle: "",
      raisedWindow: null
    };
    this.windowId = 100;
  }
  componentDidMount() {
    this.globalClick = e => {
      // Ignore mouse events in the start menu
      if (e.target && e.target.matches(".ui95-startmenu *")) return;
    };
    document.body.addEventListener("mousedown", this.globalClick);

    // Error handling: pop up an error window
    this.onerror = event => {
      if (event.error) {
        this.openWindow("ErrorHandler", {
          title: event.error.message,
          error: event.error
        });
      } else if (event.promise) {
        event.promise.catch(error => {
          this.openWindow("ErrorHandler", { title: error.message, error });
        });
      }
    };
    window.addEventListener("error", this.onerror);
    window.addEventListener("unhandledrejection", this.onerror);
  }
  componentWillUnmount() {
    document.body.removeEventListener("mousedown", this.globalClick);
    window.removeEventListener("error", this.onerror);
    window.removeEventListener("unhandledrejection", this.onerror);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      startMenu: nextProps.startMenu,
      desktopIcons: nextProps.desktopIcons
    });
  }
  getWindowByTitle(title) {
    return this.state.windows.find(
      ([windowId, props]) => props.title === title
    );
  }
  raiseWindow(windowId) {
    const before = JSON.stringify(this.state.windows);
    const windows = this.state.windows;

    // Make a copy of the windows and sort them so we can set the zIndex
    const sortedWindows = [...windows];
    sortedWindows.sort((a, b) => a[1].zIndex > b[1].zIndex);

    let raisedWindow;
    sortedWindows.forEach(([appName, appProps, appChildren], i) => {
      // FIXME: setting state directly
      appProps.zIndex = i;

      // This is the raised window
      if (appProps.key === windowId) {
        appProps.zIndex = windows.length;
        appProps.isMinimized = false;
        raisedWindow = appProps;
      }
    });
    const after = JSON.stringify(this.state.windows);

    // Fake vdom diff because Preact is going slightly wild
    if (before === after && windowId === this.state.raisedWindow.key) return;

    // Apply the old order with the new zIndex
    this.setState({ windows, raisedWindow }, () => this.syncWindowHistory());
  }
  closeWindow(windowId) {
    const windows = this.state.windows;
    const newState = windows.filter(
      ([appName, appProps]) => appProps.key !== windowId
    );
    this.setState({ windows: newState });
    this.syncWindowHistory();
  }
  syncWindowHistory() {
    const { windows, raisedWindow } = this.state;
    const { onUrlChange = () => {}, site = {} } = this.props;

    function title(newTitle) {
      if (!newTitle) return site.title;
      return [newTitle, site.title].join(" ~ ");
    }

    function blank(newTitle) {
      const renderedTitle = title(newTitle);
      // window.history.replaceState({}, renderedTitle, "/");
      document.title = renderedTitle;
      onUrlChange("/");
    }

    // No windows, just revert to the homepage
    if (!windows.length) return blank();

    // No permalink, but still got a title. Give it a try
    if (!raisedWindow.permalink) return blank(raisedWindow.title);

    // window.history.replaceState({}, raisedWindow.title, raisedWindow.permalink);
    document.title = title(raisedWindow.title);
    console.log("setting new title", raisedWindow.title);
    onUrlChange(raisedWindow.permalink);
  }
  /**
   * Open a new window
   * @param  {String} appName      Name of the app to launch, eg. Alert.
   * @param  {Object} [props={}]   Props to send to the app
   * @param  {[type]} children     Any children elements to pass to the app.
   * @param  {Object} [options={}] Send updateHistory=false to suppress history for this window
   */
  openWindow(appName, props = {}, children, options = {}) {
    const { updateHistory = true } = options;
    const { apps } = this.props;
    props.title = props.title || appName;

    const existingWindow = this.getWindowByTitle(props.title);
    if (existingWindow) {
      existingWindow[1].isMinimized = false;
      return this.setState({});
    }

    if (!apps[appName]) throw new Error(`${appName} could not be executed.`);

    const windowId = this.windowId++;
    props.key = windowId;
    this.state.windows = [...this.state.windows, [appName, props, children]];

    this.raiseWindow(windowId);
    this.setState({});
  }
  windowProps(key) {
    return {
      fs: this.state.fs,
      onClose: () => this.closeWindow(key),
      onFocus: () => this.raiseWindow(key),
      onLaunchApp: (...args) => this.openWindow(...args)
    };
  }
  render({ apps }) {
    const { startMenu, desktopIcons, raisedWindow } = this.state;
    return (
      <Desktop>
        <WindowArea>
          <FileIcons
            items={desktopIcons}
            solidColor={true}
            onClick={item => this.openWindow(item.appProps.app, item.appProps)}
          />
          {this.state.windows.map(([appName, appProps, appChildren]) => {
            return h(
              apps[appName],
              { ...appProps, ...this.windowProps(appProps.key) },
              appChildren
            );
          })}
        </WindowArea>
        <Taskbar>
          <StartMenu
            items={startMenu}
            onLaunchApp={(...args) => this.openWindow(...args)}
          />
          {this.state.windows.map(([appName, appProps]) => (
            <Button
              key={appProps.key}
              classNames={`window ${
                appProps.key === raisedWindow.key ? "active" : "inactive"
              }`}
              onClick={() => this.raiseWindow(appProps.key)}
            >
              {appProps.title}
            </Button>
          ))}
        </Taskbar>
      </Desktop>
    );
  }
}

export default Shell;
