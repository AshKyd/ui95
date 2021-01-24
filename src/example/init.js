import Shell from "../apps/shell/index.js";
import { h, render, Component } from "preact";
import domready from "domready";
import { Filesystem, File } from "../lib/filesystem";
import mockedFilesystem from "../lib/filesystem/mocks.js";

import ErrorHandler from "../apps/error";
import Webview from "../apps/webview";
import Wizard from "../apps/wizard";
import Explorer from "../apps/explorer";
import MediaPlayer from "../apps/mediaplayer";
import Alert from "../apps/alert";
import Reader from "../apps/reader";
import Talks from "../apps/talks";
import TabDialog from "../apps/tabdialog";
import startMenu from "./data-start";
import desktopIcons from "./data-desktop-icons";
const site = { title: "Example ui95 app" };

function Loader(props) {
  console.log(props);
  return (
    <Alert
      {...props}
      title="Placeholder"
      text="This is where you'd make your own component to load this resource from the server & launch the relevant app."
    />
  );
}

const apps = {
  ErrorHandler,
  Webview,
  Wizard,
  Explorer,
  MediaPlayer,
  Alert,
  Reader,
  TabDialog,
  Talks,
  Loader
};

class Wrapper extends Component {
  constructor() {
    super();
    this.state = {
      fs: new Filesystem()
    };
  }
  createFilesystem() {
    // make some folders and files.
    const files = this.state.fs.files;
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
    mockedFilesystem.forEach(path => {
      const components = path.split("/");
      const label = components.pop().trim();
      const fullPath = "c:" + path;
      const newFile = new File(fullPath, {
        label,
        appProps: label.includes(".") && {
          app: "Alert",
          title: path,
          html: `${path} is not accessible<br><br>Access is denied.`,
          icon: "error-circle"
        }
      });
      newFile.icon = "default";
      files.push(newFile);
    });
  }
  componentDidMount() {
    this.createFilesystem();
  }
  render(props) {
    // Initialise our shell app. This includes the desktop, start menu, space
    // for all the apps to be drawn in.
    const { fs } = this.state;
    return (
      <Shell
        fs={fs}
        startMenu={startMenu}
        desktopIcons={desktopIcons}
        apps={apps}
        ref={shell => (this.shell = shell)}
        site={site}
        fullscreen
      />
    );
  }
}

domready(() => {
  render(<Wrapper />, document.body);
});
