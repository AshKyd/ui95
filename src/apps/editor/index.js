import { h, render, Component } from "preact";
import "./style.css";
import Window from "../../components/window/index.js";
import HTML from "../../components/html/index.js";
import Toolbar from "../../components/toolbar/index.js";
import ScrollableContainer from "../../components/scrollablecontainer/index.js";

function Editor({
  children,
  content,
  isMinimized,
  layout,
  onClose,
  onFocus,
  title,
  url,
  zIndex
}) {
  return (
    <Window
      title={title}
      zIndex={zIndex}
      classNames="blog-article"
      isMinimized={isMinimized}
      onClose={onClose}
      onFocus={onFocus}
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
        classNames={layout}
        style={{
          position: "absolute",
          left: "2px",
          right: "2px",
          top: "80px",
          bottom: "2px",
          padding: "5px"
        }}
      >
        <HTML html={content} />
      </ScrollableContainer>
    </Window>
  );
}

export default Editor;
