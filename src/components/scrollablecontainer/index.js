import { h, render, Component } from "preact";
import Bezel from "../bezel/index.js";
import "./style.css";

function ScrollableContainer(props) {
  const className = "ui95-scrollable-container";
  const classNames = [className, ...(props.classNames || "").split(" ")].join(
    ` ${className}--`
  );
  return (
    <div className={classNames} style={props.style} ref={props.ref}>
      <Bezel classNames="in scrollable-container" style={props.bezelStyle} />
      <div class="ui95-scrollable-container__scrollable">{props.children}</div>
    </div>
  );
}

export default ScrollableContainer;
