import { h, render, Component } from "preact";
import "./style.css";

function WindowArea(props) {
  return <div className="ui95-windowarea">{props.children}</div>;
}

export default WindowArea;
