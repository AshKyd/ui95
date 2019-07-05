import { h, render, Component } from "preact";
import Window from "../../components/window";
import ScrollableContainer from "../../components/scrollablecontainer";
import HTML from "../../components/html";
import Share from "../../components/toolbar/share";
import "./reader.less";

function Reader({
  title,
  src,
  onClose,
  onFocus,
  isMinimized,
  zIndex,
  content
}) {
  // Lazy split pages by <hr>. Potentially buggy. Be careful.
  const pages = content.split("<hr>");
  return (
    <Window
      title={title}
      zIndex={zIndex}
      classNames="webview"
      width={800}
      height={600}
      isMinimized={isMinimized}
      onClose={onClose}
      onFocus={onFocus}
    >
      <div className="ui95__reader">
        <Share />
        <ScrollableContainer
          style={{
            position: "absolute",
            left: "2px",
            right: "2px",
            top: "80px",
            bottom: "2px",
            padding: "5px"
          }}
        >
          <article className="ui95__reader-wrap">
            {pages.map((page, i) => (
              <div key={i} className="ui95__reader-page">
                <HTML html={page} />
              </div>
            ))}
          </article>
        </ScrollableContainer>
      </div>
    </Window>
  );
}

export default Reader;
