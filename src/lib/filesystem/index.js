const uniqBy = require("lodash/uniqBy");

const types = {
  com: "MS-DOS Application",
  sys: "System File",
  bat: "MS-DOS Batch File",
  txt: "Blog Post",
  folder: "File Folder",
  drive: "Local Disk",
};

class File {
  constructor(path, extras = {}) {
    const split = path && path.split("/");
    this.filename = split.pop();
    this.path = "/" + split.join("/");
    this.extension = this.filename.includes(".")
      ? this.filename.split(".").pop()
      : null;
    this.description = types[this.extension];
    this.label = extras.label;
    this.setIcon();
    Object.assign(this, extras);
  }
  setIcon() {
    if (this.filename === "My Documents") return (this.icon = "mydocuments");
    if (this.filename === "My Computer") return (this.icon = "mycomputer");
    if (this.filename.match(/a:$/)) return (this.icon = "floppy");
    if (this.filename.match(/:$/)) return (this.icon = "drive");
    if (this.extension === null) return (this.icon = "folder");
    if (["txt", "doc", "ini", "cfg"].includes(this.extension.toLowerCase()))
      return (this.icon = "wordpad");
    if (["exe", "bat"].includes(this.extension.toLowerCase()))
      return (this.icon = "default");
    if (["avi"].includes(this.extension.toLowerCase()))
      return (this.icon = "video");
    return (this.icon = "document");
  }
  fullPath() {
    return [this.path, this.filename].join("/");
  }
}

class Filesystem {
  constructor({ files } = {}) {
    this.files = files || [];
  }
  getObjectType(filename) {
    if (filename.includes(":")) return "drive";
    if (!filename.includes(".")) return "folder";
    return filename.substr(-3);
  }
  conformPath(path = "") {
    return ("/" + path.replace(/^\/*/, "").replace(/\/$/, "")).toLowerCase();
  }
  getFolder(requestedPath) {
    if (requestedPath === "/")
      return new File("/", {
        label: "My Computer",
        description: "Select an item to view its description.",
        icon: "mycomputer",
      });
    const path = this.conformPath(requestedPath);
    const folder = this.files.find((file) => {
      const thisPath =
        (file.path === "/" ? "" : file.path.toLowerCase()) +
        "/" +
        file.filename.toLowerCase();
      return thisPath === path;
    });

    if (folder) return folder;

    return new File(path);
  }
  getFiles(requestedPath) {
    const path = this.conformPath(requestedPath);
    const files = this.files.filter((file) => file.path.toLowerCase() === path);

    files.sort((a, b) => {
      const dirA = !a.filename.includes(".");
      const dirB = !b.filename.includes(".");
      if ((dirA || dirB) && !(dirA && dirB)) {
        return 0 - dirA + dirB;
      }

      if (a.filename === b.filename) return 0;
      return a.filename < b.filename ? -1 : 1;
    });
    return uniqBy(files, "filename");
  }
}

export { Filesystem, File };
