import { h, render, Component } from "preact";
import "./style.css";
import Window from "../../components/window/index.js";
import HTML from "../../components/html/index.js";
import Toolbar from "../../components/toolbar/index.js";
import Bezel from "../../components/bezel/index.js";

class Editor extends Component {
  constructor(props) {
    super();
    this.state = {
      zIndex: props.zIndex
    };
  }
  componentWillReceiveProps(nextProps, nextContext) {
    this.setState(() => ({
      zIndex: nextProps.zIndex,
      isMinimized: nextProps.isMinimized
    }));
  }
  render({ content, url, onClose, onFocus, children }) {
    return (
      <Window
        title={this.state.title}
        zIndex={this.state.zIndex}
        classNames="blog-article"
        isMinimized={this.state.isMinimized}
        onClose={onClose}
        onFocus={onFocus}
        width={470}
        height={320}
        icon="word"
      >
        <Toolbar
          items={[
            { text: "File" },
            { text: "Edit" },
            { text: "View" },
            { text: "Insert" }
          ]}
        />
        <Toolbar
          items={[
            { icon: "documentNew" },
            { icon: "open" },
            { icon: "save" },
            "divider"
          ]}
        />
        <div class="ui95-blog-article__scrollable-container">
          <Bezel classNames="in blog-article__scrollable-container" />
          <div class="ui95-blog-article__scrollable">
            <HTML html={content}>{children}</HTML>
          </div>
        </div>
      </Window>
    );
  }
}

export default Editor;
