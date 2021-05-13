import { h, render, Component } from "preact";
import "./style.css";
import Bezel from "../../bezel/index.js";

function Input({ classNames, multiline, width, height, style, ...props } = {}) {
  const className = "input";
  const combinedClassNames = [
    className,
    "in",
    props.disabled && "disabled",
    ...(classNames || "").split(" ")
  ].join(` ${className}--`);
  const Element = multiline ? "textarea" : "input";
  return (
    <Bezel
      classNames={combinedClassNames}
      style={{
        width: width || "100px",
        height: height || "16px",
        ...(style || {})
      }}
    >
      <Element {...props} />
    </Bezel>
  );
}

export default Input;
