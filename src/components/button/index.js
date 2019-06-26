import { h, render, Component } from "preact";
import { getClasses } from "../../util";
import "./style.css";

function Button(props) {
  return h(props.type || "button", {
    ...props,
    ref: props.fwdRef,
    className: getClasses("button", props.classNames),
    "aria-pressed": (props.classNames || "").includes("active")
  });
}

export default Button;
