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
        items={[
          { text: "File", items: [] },
          { text: "Edit", items: [] },
          { text: "View", items: [] },
          { text: "Insert", items: [] }
        ]}
      />
      <Toolbar
        iconOnly={true}
        items={[
          { text: "New document", icon: "documentNew" },
          { text: "Open", icon: "open" },
          { text: "Save", icon: "save" },
          "divider"
        ]}
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
