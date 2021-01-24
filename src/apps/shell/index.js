import defaultsDeep from "lodash/defaultsDeep";
import Desktop from "../../components/desktop";
import Window from "../../components/window";
import WindowArea from "../../components/desktop/windowarea";
import Taskbar from "../../components/taskbar";
import FileIcons from "../../components/desktop/fileicons";
import Toolbar from "../../components/toolbar";
import Menu from "../../components/menu";
import { h, render, Component } from "preact";

class Shell extends Component {
  constructor(props) {
    super();
    this.state = {
      fs: props.fs,
      windows: [],
      trayItems: props.trayItems || [],
      defaultTitle: "",
      raisedWindow: null,
      contextMenu: null
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
    window.shell = (...args) => this[args.shift()](...args);
  }
  componentWillUnmount() {
    document.body.removeEventListener("mousedown", this.globalClick);
    window.removeEventListener("error", this.onerror);
    window.removeEventListener("unhandledrejection", this.onerror);
  }
  getWindowByTitle(title) {
    return this.state.windows.find(
      ({ windowProps }) => windowProps.title === title
    );
  }
  raiseWindow(windowId) {
    const before = JSON.stringify(this.state.windows);
    const windows = this.state.windows;

    // Make a copy of the windows and sort them so we can set the zIndex
    const sortedWindows = [...windows];
    sortedWindows.sort((a, b) => a.windowProps.zIndex > b.windowProps.zIndex);

    let raisedWindow;
    sortedWindows.forEach(
      ({ appName, appProps, appChildren, windowProps }, i) => {
        windowProps.zIndex = i;

        // This is the raised window
        if (windowProps.key === windowId) {
          windowProps.zIndex = windows.length;
          windowProps.isMinimized = false;
          raisedWindow = windowProps;
        }
      }
    );
    const after = JSON.stringify(this.state.windows);

    // Fake vdom diff because Preact is going slightly wild
    if (before === after && windowId === this.state.raisedWindow.key) return;

    // Apply the old order with the new zIndex
    this.setState({ windows, raisedWindow }, () => this.syncWindowHistory());
  }
  closeWindow(windowId) {
    const windows = this.state.windows;
    const newState = windows.filter(
      ({ windowProps }) => windowProps.key !== windowId
    );
    this.setState({ windows: newState });
    this.syncWindowHistory();
  }
  minimizeWindow(windowId) {
    const windows = this.state.windows;
    let raisedWindow = this.state.raisedWindow;

    // Raise the next highest window
    if (raisedWindow && raisedWindow.key === windowId) {
      raisedWindow = [...windows]
        .map(({ windowProps }) => windowProps)
        .filter(({ isMinimized }) => !isMinimized)
        .filter(({ key }) => key !== windowId)
        .sort((a, b) => a.zIndex - b.zIndex)
        .pop();
    }

    this.setState(
      () => ({ raisedWindow }),
      () => this.setAppState(windowId, { windowProps: { isMinimized: true } })
    );
    this.syncWindowHistory();
  }
  syncWindowHistory() {
    const { syncWindowHistory } = this.props;
    const { raisedWindow, windows } = this.state;
    if (!syncWindowHistory) return;

    if (!raisedWindow) return syncWindowHistory();
    return syncWindowHistory(
      windows.find(window => window.windowProps.key === raisedWindow.key)
    );
  }
  /**
   * Open a new window
   * @param  {String} appName      Name of the app to launch, eg. Alert.
   * @param  {Object} [props={}]   Props to send to the app
   * @param  {[type]} children     Any children elements to pass to the app.
   * @param  {Object} [options={}] Send updateHistory=false to suppress history for this window
   */
  openWindow(appName, appProps = {}, children, options = {}) {
    const { updateHistory = true } = options;
    const { apps } = this.props;
    const windowProps = {
      title: (appProps.title = appProps.title || appName)
    };

    // get initial props from the app
    const app = apps[appName];
    if (!app) throw new Error(`${appName} could not be executed.`);
    if (app.prototype.getInitialState) {
      Object.assign(windowProps, app.prototype.getInitialState(appProps));
    }

    // // Raise existing window
    // const existingWindow = this.getWindowByTitle(windowProps.title);
    // if (existingWindow) {
    //   console.log("existing window exists", existingWindow);
    //   return this.raiseWindow(existingWindow.windowProps.key);
    // }

    const windowId = this.windowId++;
    windowProps.key = windowId;
    const newWindow = { appName, appProps, children, windowProps };

    this.state.windows = [...this.state.windows, newWindow];

    this.raiseWindow(windowId);
    this.setState({});
  }
  openContextMenu(contextMenu) {
    this.setState({ contextMenu });
  }
  setAppState(windowId, newProps) {
    const { windows } = this.state;
    const appProps = newProps.appProps || {};
    const newWindows = windows.map(window => {
      if (window.windowProps.key !== windowId) return window;
      return defaultsDeep(
        {},
        { windowProps: { title: appProps.title } },
        newProps,
        window
      );
    });
    this.setState({ windows: newWindows }, () => {
      if (appProps.permalink) this.syncWindowHistory();
    });
  }
  windowProps(windowProps) {
    const key = windowProps.key;
    return {
      wmProps: {
        fs: this.state.fs,
        onClose: () => this.closeWindow(key),
        onMinimize: () => this.minimizeWindow(key),
        onFocus: () => this.raiseWindow(key),
        setAppState: newState => this.setAppState(key, newState),
        shell: this,
        ...windowProps
      }
    };
  }
  render({ apps, fullscreen }) {
    const { startMenu, desktopIcons } = this.props;
    const { raisedWindow, trayItems, windows, contextMenu } = this.state;
    return (
      <Desktop fullscreen={fullscreen}>
        <WindowArea shell={this}>
          <FileIcons
            direction="column"
            mode="desktop"
            items={desktopIcons}
            solidColor={true}
            onClick={item => this.openWindow(item.appProps.app, item.appProps)}
          />
          {windows.map(({ appName, appProps, appChildren, windowProps }) => {
            const App = apps[appName];
            return <App {...appProps} {...this.windowProps(windowProps)} />;
          })}
        </WindowArea>
        <Taskbar
          startMenu={startMenu}
          windows={windows}
          trayItems={trayItems}
          raisedWindow={raisedWindow}
          raiseWindow={key => this.raiseWindow(key)}
          minimizeWindow={key => this.minimizeWindow(key)}
          onLaunchApp={(...args) => this.openWindow(...args)}
          shell={this}
        />
        {contextMenu && (
          <Menu
            deferAction
            onClose={appProps => {
              // Insert a delay to avoid immediately selecting the first item
              // on mouse up
              if (Date.now() < contextMenu.minEndTime) return;
              this.setState({ contextMenu: null });
              if (appProps) this.openWindow(appProps.app, appProps);
            }}
            {...contextMenu}
          />
        )}
      </Desktop>
    );
  }
}

export default Shell;
