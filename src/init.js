import Shell from "./apps/shell/index.js";
import { h, render, Component } from "preact";
import domready from "domready";
import { Filesystem, File } from "./lib/filesystem/index.js";

function tryParse(json) {
  try {
    return [JSON.parse(json)];
  } catch (error) {
    return [null, error];
  }
}

/**
 * Convert the payload from Hexo to something the editor app can use
 */
function articleToAppProps(currentPage) {
  return {
    content: currentPage.content,
    title: currentPage.title,
    ...(currentPage.appProps || {})
  };
}

/**
 * Fetch a page asynchronously & parse out the JS payload.
 */
function fetchAsync(props) {
  return (
    fetch(props.permalink)
      .then(res => res.text())
      .then(html => {
        const doc = document.implementation.createHTMLDocument("");
        doc.documentElement.innerHTML = html;
        const payload = doc.documentElement.querySelector("#hexoPageData")
          .innerText;
        return JSON.parse(payload);
      })
      // FIXME: only works for article pages rn
      .then(page => {
        return articleToAppProps(page.currentPage);
      })
      .catch(console.error)
  );
}

/**
 * This stuff is really specific to my site, so it should probably be
 * split out of this repo. Serves as a good example I guess.
 * @extends Component
 */
class Wrapper extends Component {
  constructor() {
    super();
    this.state = {
      fs: new Filesystem()
    };
  }
  createFilesystem({ posts }) {
    // make some folders and files.
    const files = this.state.fs.files;
    const blogRoot = "c:/My Documents/My Weblogs";
    const boilerplate = [
      "c:",
      "c:/My Documents",
      "c:/Windows",
      "c:/Program Files",
      blogRoot
    ].forEach(path => files.push(new File(path)));

    // Put links to all my posts in "My Documents"
    const layouts = new Set();
    posts.forEach(post => {
      layouts.add(post.layout);

      const path = [
        blogRoot,
        post.layout,
        post.permalink
          .substr(0, post.permalink.length - 1)
          .split("/")
          .pop() + ".doc"
      ].join("/");
      files.push(
        new File(path, {
          appProps: {
            app: "Editor",
            permalink: post.permalink.replace("https://ash.ms", ""),
            title: post.title,
            asyncProps: fetchAsync
          }
        })
      );
    });

    Array.from(layouts).forEach(layout =>
      files.push(new File([blogRoot, layout].join("/")))
    );
  }
  componentDidMount() {
    // Parse any content out of the page and send that into the shell.
    const json = window.hexoPageData.innerText;
    const [hexoPageData, error] = tryParse(json);
    if (error)
      return this.explorer.openWindow("ErrorHandler", {
        error,
        title: "Could not load programs for this page",
        debugInfo: json
      });

    // Mash up our data.
    const { currentPage, startMenu, desktopIcons, posts, pages } = hexoPageData;

    this.setState({
      startMenu,
      desktopIcons
    });

    // Set up the filesystem
    this.createFilesystem({ posts, pages });

    const appData = articleToAppProps(currentPage);

    // If we don't have an app to load in our payload, open an error saying so.
    if (!appData.app) {
      return this.explorer.openWindow("ErrorHandler", {
        title: "Unknown error",
        error: new Error("Could not infer app to load from URL"),
        debugInfo: JSON.stringify(appData, null, 2)
      });
    }

    // Open the specified window
    this.explorer.openWindow(appData.app, appData);
  }
  render(props) {
    // Initialise our shell app. This includes the desktop, start menu, space
    // for all the apps to be drawn in.
    return (
      <Shell
        fs={this.state.fs}
        startMenu={this.state.startMenu}
        desktopIcons={this.state.desktopIcons}
        ref={explorer => (this.explorer = explorer)}
      />
    );
  }
}

domready(() => {
  document.body.style = "overflow: hidden;";
  render(<Wrapper />, document.body);
});
