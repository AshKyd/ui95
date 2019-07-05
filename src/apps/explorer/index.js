import { h, render, Component } from "preact";
import "./style.css";
import Window from "../../components/window/index.js";
import Toolbar from "../../components/toolbar/index.js";
import Divider from "../../components/divider/index.js";
import ScrollableContainer from "../../components/scrollablecontainer/index.js";
import Text from "../../components/text/index.js";
import Icon from "../../components/icon/index.js";
import FileIcons from "../../components/desktop/fileicons/index.js";
import menuItems from "./menuItems.js";

class Explorer extends Component {
  constructor({ title, zIndex, path, fs }) {
    super();
    this.state = {
      title,
      zIndex,
      path,
      folder: fs.getFolder(path)
    };
    this.history = {
      past: [],
      future: []
    };
  }
  componentWillReceiveProps(nextProps, nextContext) {
    this.setState(() => ({
      title: nextProps.title,
      zIndex: nextProps.zIndex
    }));
  }
  openItem(item) {
    if (item.appProps) {
      return this.props.onLaunchApp(item.appProps.app, item.appProps);
    }
    if (item.permalink) window.location = item.permalink;
    const path = [item.path, item.filename].join("/");
    this.navigateTo(path);
  }
  goUp() {
    this.navigateTo(this.state.folder.path);
  }
  goBack() {
    const previousFolder = this.history.past.pop();
    if (!previousFolder) return;
    this.history.future.push(this.state.folder);
    this.setState({ folder: previousFolder, file: previousFolder });
  }
  goForward() {
    const previousFolder = this.history.future.pop();
    if (!previousFolder) return;
    this.history.past.push(this.state.folder);
    this.setState({ folder: previousFolder, file: previousFolder });
  }
  navigateTo(path) {
    const fs = this.props.fs;
    const folder = fs.getFolder(path);
    this.history.past.push(this.state.folder);
    this.history.future = [];
    this.setState({ folder });
  }
  setFile(file) {
    this.setState({ file });
  }
  render(props) {
    const { file, folder } = this.state;
    const fs = this.props.fs;
    const files = fs.getFiles(folder.fullPath());
    return (
      <Window
        title={this.state.title}
        zIndex={this.state.zIndex}
        classNames="explorer"
        onClose={props.onClose}
        onFocus={props.onFocus}
        icon="explorer"
      >
        <Toolbar variant="text" items={menuItems} />{" "}
        <Toolbar
          variant="stacked"
          items={[
            {
              text: "Back",
              icon: "explorer-back",
              onClick: () => this.goBack()
            },
            {
              text: "Forward",
              icon: "explorer-forward",
              onClick: () => this.goForward()
            },
            { text: "Up", icon: "explorer-up", onClick: () => this.goUp() }
          ]}
        />
        <ScrollableContainer
          style={{
            position: "absolute",
            left: "2px",
            right: "2px",
            top: "100px",
            bottom: "2px"
          }}
        >
          <div class="ui95-explorer-columns__left">
            <Icon size={32} name={file ? file.icon : folder.icon} />
            <Text style={{ fontWeight: "bold" }}>
              <h2 class="ui95-explorer-columns__folder-name">
                {file ? file.label || file.filename : folder.filename}
              </h2>
            </Text>
            <Divider
              classNames="rainbow"
              style={{
                marginTop: "5px",
                marginBottom: "15px"
              }}
            />
            <Text>
              {file
                ? file.description || file.type
                : "Select an item to view its description."}
            </Text>
          </div>
          <div class="ui95-explorer-columns__right">
            <FileIcons
              items={files}
              onSelect={file => this.setFile(file)}
              onClick={file => this.openItem(file)}
              onUnselect={() => this.setState({ file: null })}
            />
          </div>
        </ScrollableContainer>
      </Window>
    );
  }
}

export default Explorer;
