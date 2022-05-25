import { h, render, Component } from "preact";
import "./style.css";

function Divider(props) {
  const className = "ui95-divider";
  return h(
    "div",
    {
      className: [
        className,
        ...(props.classNames || props.className || "").split(" ")
      ].join(` ${className}--`),
      style: props.style
    },
    props.children
  );
}

export default Divider;
