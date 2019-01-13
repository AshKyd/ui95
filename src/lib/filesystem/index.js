import types from "./types.js";

class File {
  constructor(path, extras) {
    const extension = path.substr(-3);
    const split = path.split("/");
    this.filename = split.pop();
    this.path = "/" + split.join("/");
    this.description = types[extension];
    Object.assign(this, extras);
  }
}

class Filesystem {
  constructor({ files } = {}) {
    this.files = files || [];
  }
  setupMocks() {
    import("./mocks.js").then(mocks => {});
  }
  loadMocks() {}
  getObjectType(filename) {
    if (filename.includes(":")) return "drive";
    if (!filename.includes(".")) return "folder";
    return filename.substr(-3);
  }
  conformPath(path) {
    return "/" + path.replace(/^\/*/, "").replace(/\/$/, "");
  }
  getFolder(requestedPath) {
    const path = this.conformPath(requestedPath);
    if (path === "")
      return new File("", {
        filename: "My Computer",
        description: "Select an item to view its description.",
        path
      });
    const folder = this.files.find(
      file => file.path + "/" + file.filename === path
    );
    if (folder) return folder;

    return new File(path);
  }
  getFiles(requestedPath) {
    const path = this.conformPath(requestedPath);
    const files = this.files.filter(file => file.path === path);
    return files;
  }
}

export { Filesystem, File };
