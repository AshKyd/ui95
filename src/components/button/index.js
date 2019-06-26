import { h, render, Component } from "preact";
import { getClasses } from "../../util";
import "./style.css";

function Button(props) {
  const {
    type,
    classNames,
    onClick,
    onMouseDown,
    disabled,
    style,
    children,
    fwdRef
  } = props;
  return h(
    type || "button",
    {
      className: getClasses("button", classNames),
      onClick,
      onMouseDown,
      disabled,
      style,
      ref: fwdRef
    },
    children
  );
}

export default Button;
