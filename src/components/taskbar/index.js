import { h, render, Component } from "preact";
import "./style.css";

function Taskbar(props) {
  return <div className="ui95-start">{props.children}</div>;
}

export default Taskbar;
