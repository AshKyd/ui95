import { h, render, Component } from "preact";
import "./style.css";
import Bezel from "../../bezel/index.js";

function Input(props) {
  const className = "input";
  const classNames = [
    className,
    "in",
    props.disabled && "disabled",
    ...(props.classNames || "").split(" ")
  ].join(` ${className}--`);
  const element = props.multiline ? "textarea" : "input";
  return (
    <Bezel
      classNames={classNames}
      style={{
        width: props.width || "100px",
        height: props.height || "16px",
        ...(props.style || {})
      }}
    >
      {h(element, {
        value: props.value,
        disabled: props.disabled
      })}
    </Bezel>
  );
}

export default Input;
