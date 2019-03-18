import { h, render, Component } from "preact";
import "./style.css";

function Desktop(props) {
  return <div className="ui95-desktop">{props.children}</div>;
}

export default Desktop;
