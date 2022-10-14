import { h, render, Component } from "preact";
import "./style.css";

import builtIn from "icons95";

builtIn[24].default = builtIn[16].default;

function getSrc(name, size) {
  // this is a built in icon
  if (builtIn[size] && builtIn[size][name]) {
    return "data:image/gif;base64," + builtIn[size][name];
  }

  // this is a path.
  if (name.includes("/")) {
    return name;
  }

  // this is an icon in our local icon store
  return `${window.iconsDir || "/icons/"}/${size}/${name}.gif`;
}

function Icon({ name = "default", size = 16, classNames, style }) {
  const src = getSrc(name, size);
  const iconSize = size === "custom" ? undefined : size;

  console.log(name, size, src);

  const className = [
    "ui95-icon",
    name,
    size,
    (classNames || "").split(" "),
  ].join(" ui95-icon--");
  return h("img", {
    className,
    style,
    ...this.props,
    width: iconSize,
    height: iconSize,
    src,
    alt: this.props.alt || "",
  });
}

export default Icon;
