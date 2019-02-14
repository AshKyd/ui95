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
  constructor(props) {
    super();
    this.state = {
      title: props.title,
      zIndex: props.zIndex,
      path: props.path
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
    this.setState({ path });
  }
  setFile(file) {
    this.setState({ file });
  }
  render(props) {
    const file = this.state.file;
    const fs = this.props.fs;
    const folder = fs.getFolder(this.state.path);
    const files = fs.getFiles(this.state.path);
    return (
      <Window
        title={this.state.title}
        zIndex={this.state.zIndex}
        classNames="explorer"
        width={640}
        height={480}
        onClose={props.onClose}
        onFocus={props.onFocus}
        icon="explorer"
      >
        <Toolbar items={menuItems} />
        <ScrollableContainer
          style={{
            position: "absolute",
            left: "calc(2 * var(--px))",
            right: "calc(2 * var(--px))",
            top: "calc(80 * var(--px))",
            bottom: "calc(2 * var(--px))"
          }}
        >
          <div class="ui95-explorer-columns__left">
            <Icon size={32} name={file ? file.icon : folder.icon} />
            <Text style={{ fontWeight: "bold" }}>
              <h2 class="ui95-explorer-columns__folder-name">
                {file ? file.filename : folder.filename}
              </h2>
            </Text>
            <Divider
              classNames="rainbow"
              style={{
                marginTop: "calc(5 * var(--px))",
                marginBottom: "calc(15 * var(--px))"
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
