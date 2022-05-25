import { h, render, Component } from "preact";
import "./style.css";

import builtIn from "icons95";

builtIn[24].default = builtIn[16].default;

class Icon extends Component {
  getUrl(size, name) {
    if (builtIn[size] && builtIn[size][name])
      return "data:image/gif;base64," + builtIn[size][name];
    return `${window.iconsDir || "/icons/"}/${size}/${name}.gif`;
  }
  getSize(size) {
    if (size === "custom") return undefined;
    return size;
  }
  render({ name = "default", size = 16, classNames, url, style }) {
    const className = [
      "ui95-icon",
      name,
      size,
      (classNames || "").split(" ")
    ].join(" ui95-icon--");
    return h("img", {
      className,
      style,
      ...this.props,
      width: this.getSize(size),
      height: this.getSize(size),
      src: url || this.getUrl(size, name),
      alt: this.props.alt || ""
    });
  }
}

export default Icon;
