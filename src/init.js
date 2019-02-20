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
function initCap(str) {
  const chars = str.split("");
  chars[0] = chars[0].toUpperCase();
  return chars.join("");
}

/**
 * Convert the payload from Hexo to something the editor app can use
 */
function articleToAppProps(currentPage, content) {
  return {
    content,
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
        const page = JSON.parse(
          doc.documentElement.querySelector("#hexoPageData").innerText
        );
        const content = doc.documentElement.querySelector("article").innerHTML;
        return { page, content };
      })
      // FIXME: only works for article pages rn
      .then(({ page, content }) => {
        console.log(page, content);
        return articleToAppProps(page.currentPage, content);
      })
      .catch(console.error)
  );
}

function createFile(path, post) {
  const permalink = post.permalink.replace("https://ash.ms", "");
  if (post.layout === "video") {
    return new File(path + ".avi", {
      appProps: {
        app: "MediaPlayer",
        permalink,
        title: post.title,
        asyncProps: fetchAsync
      }
    });
  }

  return new File(path + ".doc", {
    appProps: {
      app: "Editor",
      permalink,
      title: post.title,
      asyncProps: fetchAsync
    }
  });
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
    const blogRoot = "c:/My Documents";
    files.push(
      new File("a:", {
        label: "3½ Floppy (A:)",
        appProps: {
          app: "Alert",
          icon: "info",
          title: "A:",
          text:
            "There is no disk in this drive or the drive door is open. Insert a disk in the drive and make sure the drive door is closed, and then click Retry.",
          width: 400,
          height: 248,
          buttons: [{ text: "Retry" }, { text: "Cancel" }]
        }
      })
    );
    files.push(new File("c:", { label: "Local Disk (C:)" }));
    files.push(new File(blogRoot));

    const boilerplate = ["c:/Windows", "c:/Program Files"].forEach(path =>
      files.push(
        new File(path, {
          appProps: {
            app: "Alert",
            title: path,
            html: `${path} is not accessible<br><br>Access is denied.`,
            icon: "error-circle"
          }
        })
      )
    );

    // Put links to all my posts in "My Documents"
    const layouts = new Set();
    posts.forEach(post => {
      const layoutFolder = initCap(post.layout) + "s";
      layouts.add(layoutFolder);

      const path = [
        blogRoot,
        layoutFolder,
        post.permalink
          .substr(0, post.permalink.length - 1)
          .split("/")
          .pop()
      ].join("/");
      files.push(createFile(path, post));
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

    const content = document.querySelector("article").innerHTML;
    const appData = articleToAppProps(currentPage, content);

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
