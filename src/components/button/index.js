import { h, render, Component } from "preact";
import { getClasses } from "../../util";
import "./style.css";

function Button({
  type,
  classNames,
  onClick,
  onMouseDown,
  disabled,
  style,
  children
}) {
  return h(
    type || "button",
    {
      className: getClasses("button", classNames),
      onClick,
      onMouseDown,
      disabled,
      style
    },
    children
  );
}

export default Button;
