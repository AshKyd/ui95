import mocks from "./mocks.js";
import types from "./types.js";

class Filesystem {
  constructor() {
    this.files = [];
  }
  loadMocks() {}
  getObjectType(filename) {
    if (filename.includes(":")) return "drive";
    if (!filename.includes(".")) return "folder";
    return filename.substr(-3);
  }
  infer(file) {
    if (!file.label) return file;
    const extension = this.getObjectType(file.label);
    console.log({ extension });
    const fileType = types[extension] || `${extension.toUpperCase()} File`;
    return { ...file, type: fileType };
  }
}

export default Filesystem;
