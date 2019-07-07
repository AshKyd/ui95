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
      <Share />
      <ScrollableContainer>
        <article className="ui95__reader-wrap">
          {pages.map((page, i) => (
            <div key={i} className="ui95__reader-page">
              <HTML html={page} />
            </div>
          ))}
        </article>
      </ScrollableContainer>
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
