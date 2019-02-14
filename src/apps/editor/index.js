import { h, render, Component } from "preact";
import "./style.css";
import Window from "../../components/window/index.js";
import HTML from "../../components/html/index.js";
import Toolbar from "../../components/toolbar/index.js";
import ScrollableContainer from "../../components/scrollablecontainer/index.js";

class Editor extends Component {
  constructor(props) {
    super();
    this.state = {
      zIndex: props.zIndex,
      content: props.content,
      width: props.width || 800,
      height: props.height || 600
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState(() => ({
      zIndex: nextProps.zIndex,
      isMinimized: nextProps.isMinimized,
      content: nextProps.content
    }));
  }
  render({ content, url, onClose, onFocus, children }) {
    return (
      <Window
        title={this.props.title}
        zIndex={this.state.zIndex}
        classNames="blog-article"
        isMinimized={this.state.isMinimized}
        onClose={onClose}
        onFocus={onFocus}
        width={this.state.width}
        height={this.state.height}
        icon="word"
      >
        <Toolbar
          items={{
            File: {},
            Edit: {},
            View: {},
            Insert: {}
          }}
        />
        <Toolbar
          iconOnly={true}
          items={{
            "New document": { icon: "documentNew" },
            Open: { icon: "open" },
            Save: { icon: "save" },
            divider: "divider"
          }}
        />
        <ScrollableContainer
          style={{
            position: "absolute",
            left: "calc(2 * var(--px))",
            right: "calc(2 * var(--px))",
            top: "calc(80 * var(--px))",
            bottom: "calc(2 * var(--px))",
            padding: "calc(5 * var(--px))"
          }}
        >
          <HTML html={this.props.content} />
        </ScrollableContainer>
      </Window>
    );
  }
}

export default Editor;
