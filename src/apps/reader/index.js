import { h, render, Component } from "preact";
import Window from "../../components/window";
import ScrollableContainer from "../../components/scrollablecontainer";
import HTML from "../../components/html";
import Share from "../../components/toolbar/share";
import "./reader.css";

// const loadedScripts = {};
// function loadScript(src) {
//   const promise = Promise((resolve, reject) => {
//     const s = document.createElement("script");
//     s.onload = resolve;
//     s.error = reject;
//     s.src = src;
//     document.head.appendChild(s);
//   });
//
//   loadedScripts[src] = promise;
//   return promise;
// }

function loadTwitter() {
  window.twttr = (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0],
      t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);

    t._e = [];
    t.ready = function (f) {
      t._e.push(f);
    };

    return t;
  })(document, "script", "twitter-wjs");
}

class Reader extends Component {
  componentDidMount() {
    this.initSocials();
  }
  componentDidUpdate() {
    this.initSocials();
  }
  initSocials() {
    const { content } = this.props;
    if (!this.el) return;
    if (content && content.includes("twitter-tweet")) {
      loadTwitter();
      try {
        window.twttr.widgets.load(this.el);
      } catch (error) {
        console.error("could not load twitter", error);
      }
    }

    this.el.querySelectorAll('a[href^="/"]').forEach((link) => {
      if (link.href.match(/\/[^/]/))
        link.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.props.wmProps.shell.openWindow("Loader", {
            permalink: link.href,
          });
        });
    });

    // Make hash links work. This doesn't work, not sure why yet
    // this.el.querySelectorAll('a[href^="#"]').forEach(link => {
    //   link.addEventListener("click", e => {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     const target =
    //       document.querySelector(e.target.hash) ||
    //       document.querySelector(`[name="${e.target.hash.slice(1)}"]`);
    //     console.log({ target });
    //     if (!target) return;
    //     this.scrollable.scrollTop = target.offsetTop;
    //   });
    // });
  }
  render({ content, wmProps }) {
    // Lazy split pages by <hr>. Potentially buggy. Be careful.
    const pages = (content || "").split(/<hr[^>]*>/);
    return (
      <Window
        icon="wordpad"
        className="reader"
        width={800}
        height={600}
        {...wmProps}
      >
        <Share />
        <ScrollableContainer ref={(el) => (this.scrollable = el)}>
          <article className="ui95__reader-wrap" ref={(el) => (this.el = el)}>
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
}

Reader.prototype.getInitialState = function () {
  return {
    title: "Reader",
    icon: "wordpad",
  };
};

export default Reader;
