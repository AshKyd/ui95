import { h, render, Component } from "preact";
import "./style.css";
import Window from "../../components/window";
import Toolbar from "../../components/toolbar";
import Divider from "../../components/divider";
import ContainerQuery from "../../components/ContainerQuery";
import ScrollableContainer from "../../components/scrollablecontainer";
import Text from "../../components/text";
import Icon from "../../components/icon";
import FileIcons from "../../components/desktop/fileicons";
import DetailsView from "../../components/desktop/DetailsView";
import menuItems from "./menuItems";

class Explorer extends Component {
  constructor({ title, path, wmProps = {} }) {
    super();
    this.state = {
      path,
      folder: wmProps.fs.getFolder(path)
    };
    this.history = {
      past: [],
      future: []
    };
  }
  componentDidMount() {
    this.syncTitle();
  }
  openItem(item) {
    const { wmProps } = this.props;
    if (item.appProps && item.appProps.app !== "Explorer") {
      return wmProps.shell.openWindow(item.appProps.app, item.appProps);
    }
    if (item.path && item.filename) {
      const path = [item.path, item.filename].join("/");
      return this.navigateTo(path);
    }
    if (item.permalink) window.location = item.permalink;
    console.error("nothing to do with this file");
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
    const fs = this.props.wmProps.fs;
    const folder = fs.getFolder(path);
    this.history.past.push(this.state.folder);
    this.history.future = [];
    this.setState({ folder });
  }
  setState(props) {
    super.setState(props, () => this.syncTitle());
  }
  syncTitle() {
    const { folder } = this.state;
    this.props.wmProps.setAppState({
      appProps: { title: folder.label || folder.filename, icon: "explorer" }
    });
  }
  setFile(file) {
    this.setState({ file });
  }
  render(props) {
    const { title, wmProps } = props;
    const { file, folder } = this.state;
    const fs = wmProps.fs;
    const files = fs.getFiles(folder.fullPath());
    const selectedItem = file || folder;
    const { layout, columns, defaultSort } = folder;
    const FileComponent = layout === "details" ? DetailsView : FileIcons;
    return (
      <Window
        classNames="explorer"
        icon="explorer"
        {...wmProps}
        title={title || "Explorer"}
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
        <ScrollableContainer>
          <ContainerQuery
            className="ui95-explorer-columns"
            resizeClassNames={({ width }) =>
              width < 400 && "ui95-explorer-columns__mobile"
            }
          >
            <div class="ui95-explorer-columns__left">
              <div class="ui95-explorer-columns__left-head">
                <Icon size={32} name={file ? file.icon : folder.icon} />
                <Text style={{ fontWeight: "bold" }}>
                  <h2 class="ui95-explorer-columns__folder-name">
                    {selectedItem.label || selectedItem.filename}
                  </h2>
                </Text>
              </div>
              <Divider
                classNames="rainbow"
                style={{
                  marginTop: "5px",
                  marginBottom: "15px"
                }}
              />
              <Text>
                {selectedItem.description ||
                  selectedItem.type ||
                  "Select an item to view its description."}
              </Text>
            </div>
            <div class="ui95-explorer-columns__right">
              <FileComponent
                items={files}
                onSelect={file => this.setFile(file)}
                onClick={file => this.openItem(file)}
                onUnselect={() => this.setState({ file: null })}
                columns={columns}
                defaultSort={defaultSort}
              />
            </div>
          </ContainerQuery>
        </ScrollableContainer>
      </Window>
    );
  }
}

Explorer.prototype.getInitialState = function() {
  return { icon: "explorer" };
};

export default Explorer;
