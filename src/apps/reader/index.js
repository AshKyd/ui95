import { h, render, Component } from "preact";
import Window from "../../components/window";
import ScrollableContainer from "../../components/scrollablecontainer";
import HTML from "../../components/html";
import Share from "../../components/toolbar/share";
import "./reader.less";

function Reader({ content, wmProps }) {
  // Lazy split pages by <hr>. Potentially buggy. Be careful.
  const pages = (content || "").split("<hr>");
  return (
    <Window
      icon="wordpad"
      className="reader"
      width={800}
      height={600}
      {...wmProps}
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

Reader.prototype.getInitialState = function() {
  return {
    title: "Reader",
    icon: "wordpad"
  };
};

export default Reader;
