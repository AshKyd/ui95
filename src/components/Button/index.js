import { h, render, Component } from "preact";
import { getClasses } from "../../util";
import "./style.css";

function Button({ type: Element = "button", fwdRef, classNames, ...props }) {
  return (
    <Element
      {...props}
      ref={fwdRef}
      className={getClasses("button", classNames)}
      aria-pressed={(classNames || "").includes("active")}
    />
  );
}

export default Button;
