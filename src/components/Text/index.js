import { h, render, Component } from "preact";
import "./style.css";

function Text(props) {
  const className = "ui95-text";
  return h(
    props.type || "p",
    {
      className: [
        className,
        ...(props.classNames || props.className || "").split(" ")
      ].join(` ${className}--`),
      style: `${props.style || ""} font-size: calc(${props.size ||
        10} * var(--px));`,
      dangerouslySetInnerHTML: props.html && { __html: props.html }
    },
    props.children
  );
}

export default Text;
