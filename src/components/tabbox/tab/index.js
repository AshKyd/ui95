import { h, render, Component } from "preact";
import "./style.css";

function Tab({ onClick, children, style }) {
  const className = "ui95-tab";
  return h("button", { className, onClick, style }, [
    h("div", { class: "ui95-tab__ring" }),
    children
  ]);
}

export default Tab;
